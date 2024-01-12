'use client'

import { useState } from 'react'
import { Input } from '../Input'
import { Button } from '../Button'
import { useChannel } from '@/app/context/ChannelProvider'
import { RenderError } from './LoginForm'
import { channelNameValidator } from './validators'
import { useUser } from '@/app/context/UserProvider'
import { User } from '@/app/types'

type ChannelData = {
  name: string
  image: File | undefined
  members: User[]
  leader: User
  isPrivate: boolean
}

export default function ChannelForm({
  setShowChannelForm
}: {
  setShowChannelForm: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { loggedUser }: any = useUser()
  const { createChannel }: any = useChannel()
  const [channelData, setChannelData] = useState<ChannelData>({
    name: '',
    image: undefined,
    members: [loggedUser],
    leader: loggedUser,
    isPrivate: false
  })
  const [error, setError] = useState<string | null>(null)

  const handleCheck = () => {
    setChannelData({ ...channelData, isPrivate: !channelData.isPrivate })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target

    if (name === 'image' && files && files[0]) {
      const selectedImage = files[0]
      setChannelData({
        ...channelData,
        image: selectedImage
      })
    } else {
      setChannelData({
        ...channelData,
        [name]: value
      })
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const validateChannelName = channelNameValidator(channelData.name)

    setError(validateChannelName)

    try {
      if (channelData.image) {
        const formData = new FormData()
        formData.append('file', channelData.image)

        formData.append('upload_preset', 'ml_default')

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData
          }
        )

        if (response.ok) {
          const data = await response.json()

          const imageUrl = data.secure_url

          const channelInfo = {
            name: channelData.name,
            avatar: imageUrl,
            members: channelData.members,
            leader: channelData.leader,
            isPrivate: channelData.isPrivate
          }

          if (validateChannelName.length === 0) {
            createChannel(channelInfo)
          }
        } else {
          console.error(
            'Error uploading image to Cloudinary:',
            response.statusText
          )
        }
      } else {
        const channelInfo = {
          name: channelData.name,
          members: channelData.members,
          leader: channelData.leader,
          isPrivate: channelData.isPrivate
        }
        if (validateChannelName.length === 0) {
          createChannel(channelInfo)
          setShowChannelForm(false)
        }
      }
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error)
    }
  }

  return (
    <form className='w-96 p-6 h-96 gap-12 flex flex-col border rounded-lg border-zinc-800 z-50 bg-[#101010]'>
      <div className='flex flex-col w-full gap-6 items-center'>
        <p className='text-lg'>Create a Channel</p>
        <Input
          value={channelData.name}
          name='name'
          text='Name'
          styleLabel='w-full'
          onChange={handleChange}
        />
        <RenderError text={error} />
        <Input
          name='image'
          text='Image'
          type='file'
          accept='image/png, image/gif, image/jpeg'
          styleLabel='w-full'
          onChange={handleChange}
        />

        <label className='text-sm flex gap-2 items-center mr-auto'>
          <input
            type='checkbox'
            name='isPrivate'
            checked={channelData.isPrivate}
            onChange={handleCheck}
            className='rounded text-green-600 rounded bg-zinc-700 border-zinc-600 focus:outline-none focus:ring-0 focus:ring-offset-0 duration-150'
          />
          Private server
        </label>

        <Button text='Create' onClick={handleSubmit} />
      </div>
    </form>
  )
}
