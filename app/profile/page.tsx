'use client'

import Image from 'next/image'
import { Container } from '../components/Container'
import Header from '../components/Header'
import { useUser } from '../context/UserProvider'
import { Input } from '../components/Input'
import { useState, useEffect } from 'react'
import { Button } from '../components/Button'

type Data = {
  name: string
  username: string
  image: string
}

export default function Profile() {
  const { loggedUser }: any = useUser()
  const [data, setData] = useState<Data>({
    name: '',
    username: '',
    image: ''
  })

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    if (name === 'image') {
      const file = event.target.files?.[0]

      if (file) {
        try {
          const formData = new FormData()
          formData.append('file', file)
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

            setData({
              ...data,
              image: imageUrl
            })
          } else {
            console.error(
              'Error uploading image to Cloudinary:',
              response.statusText
            )
          }
        } catch (error) {
          console.error('Error uploading image to Cloudinary:', error)
        }
      }
    } else {
      setData({
        ...data,
        [name]: value
      })
    }
  }

  useEffect(() => {
    setData({
      name: loggedUser?.name,
      username: loggedUser?.username,
      image: loggedUser?.avatar
    })
  }, [loggedUser])

  console.log(data)

  return (
    <Container>
      <Header text='My profile' />
      <div className='flex border flex-col items-center gap-6 bg-zinc-900 h-full my-16 w-full max-w-3xl p-16 rounded-md border-zinc-800'>
        <div className='relative flex items-center justify-center group'>
          <input
            className='absolute h-full w-full opacity-0 z-50 rounded-full cursor-pointer'
            type='file'
            name='image'
            onChange={handleChange}
            accept='image/png, image/gif, image/jpeg'
          />
          <Image
            src={data.image || loggedUser?.avatar}
            width={500}
            height={500}
            alt='User Avatar'
            className='object-cover rounded-full w-48 h-48 bg-black opacity-100 group-hover:opacity-30 duration-150'
          />
          <span className='absolute group-hover:opacity-100 duration-150 opacity-0'>
            Change Image
          </span>
        </div>
        <Input
          text='Name'
          styleLabel='w-full'
          name='name'
          value={data.name}
          onChange={handleChange}
        />
        <Input
          text='Username'
          styleLabel='w-full'
          name='username'
          value={data.username}
          onChange={handleChange}
        />
        <Button text='Save changes' styles='py-3 px-10 w-fit'/>
      </div>
    </Container>
  )
}
