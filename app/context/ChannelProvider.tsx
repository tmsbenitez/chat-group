'use client'

import { AuxChildren, Message, Channel, User } from '@/app/types'
import { supabase } from '../supabase'
import { useContext, createContext, useState, useEffect } from 'react'

const ChannelContext = createContext(null)

export const useChannel = () => {
  return useContext(ChannelContext)
}

export default function ChannelProvider({ children }: AuxChildren) {
  const [channels, setChannels] = useState<Channel[]>([])
  const [messages, setMessages] = useState([])
  const [currChannel, setCurrChannel] = useState<Channel>()

  const createChannel = async (channelData: any) => {
    try {
      await supabase.from('channel').insert(channelData).select()
    } catch (error) {
      console.error('Error creating channel:', error)
    }
  }

  const getChannels = async (loggedUser: User) => {
    try {
      const { data }: any = await supabase.from('channel').select()

      const filteredChannels = data.filter((channel: Channel) => {
        if (channel.members) {
          return (channel.members as User[]).some(
            user => user.id === loggedUser.id
          )
        }
        return false
      })

      if (data && data.length > 0) {
        setChannels(filteredChannels)
        return data
      }
    } catch (error) {
      console.error(error)
    }
  }

  const getChannelById = async (id: number) => {
    try {
      const { data }: any = await supabase.from('channel').select().eq('id', id)

      if (data && data.length > 0) {
        setCurrChannel(data[0])
        setMessages(data[0].messages)
        return data[0]
      }
    } catch (error) {
      console.error(error)
    }
  }

  const joinChannel = async (user: User, id: number) => {
    try {
      await supabase.rpc('join_member', {
        p_channel_id: id,
        p_user: user
      })
    } catch (error) {
      console.error('Error joining the channel:', error)
    }
  }

  const sentMessage = async (message: Message, id: number) => {
    try {
      await supabase.rpc('sent_message', {
        p_channel_id: id,
        p_message: message
      })
      await getChannelById(id)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const channel = supabase
      .channel('custom-insert-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'channel' },
        payload => {
          setChannels((prevChannels): any => [...prevChannels, payload.new])
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'channel'
        },
        payload => {
          setMessages(payload.new.messages)
        }
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [])

  const value: any = {
    channels,
    currChannel,
    createChannel,
    getChannels,
    sentMessage,
    joinChannel,
    getChannelById,
    messages
  }

  return (
    <ChannelContext.Provider value={value}>{children}</ChannelContext.Provider>
  )
}
