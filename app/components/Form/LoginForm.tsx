'use client'

import { useState } from 'react'
import { RiErrorWarningLine } from 'react-icons/ri'
import { LoginData } from '../../types'
import { Button } from '../Button'
import { Input } from '../Input'
import { useUser } from '../../context/UserProvider'
import { usernameValidator, passwordValidator } from './validators'
import Link from 'next/link'

interface loginError {
  username: string | null
  password: string | null
}

export function RenderError({ text }: { text: string | null }) {
  return (
    text &&
    text.length > 0 && (
      <p className='text-xs text-red-500 flex items-center gap-1'>
        <RiErrorWarningLine /> {text}
      </p>
    )
  )
}

export function LoginForm() {
  const { Login }: any = useUser()
  const [loginData, setLoginData] = useState<LoginData>({
    username: '',
    password: ''
  })
  const [error, setError] = useState<loginError>({
    username: null,
    password: null
  })

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [target.name]: target.value
    })
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    const validateUser = usernameValidator(loginData.username)
    const validatePassword = passwordValidator(loginData.password)

    setError({ username: validateUser, password: validatePassword })

    if (
      (error.username && error.username.length > 0) ||
      (error.password && error.password.length > 0)
    ) {
      return
    }

    Login(loginData)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col py-12 px-6 lg:px-16 gap-6 w-[500px] min-h-[600px] lg:border rounded-lg border-zinc-800'
    >
      <div className='flex flex-col gap-2 py-4'>
        <h2 className='text-center text-2xl tracking-wide flex items-center font-medium gap-2 justify-center'>
          Welcome!
        </h2>
        <span className='text-center text-xs opacity-50 font-light'>
          We're excited to see you!
        </span>
      </div>
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col gap-2'>
          <Input
            text='Username'
            name='username'
            aria-label='Username field'
            onChange={handleChange}
            value={loginData.username}
          />
          <RenderError text={error.username} />
        </div>
        <div className='flex flex-col gap-2'>
          <Input
            text='Password'
            name='password'
            aria-label='Password field'
            onChange={handleChange}
            value={loginData.password}
            type='password'
          />
          <RenderError text={error.password} />
        </div>
      </div>
      <div className='flex flex-col gap-6 justify-center '>
        <Button text='Login' />
        <p className='text-xs text-center'>
          You don't have an account?{' '}
          <Link
            href='/signup'
            className='hover:underline duration-300 text-green-500 cursor-pointer'
          >
            Sign up
          </Link>
        </p>
      </div>
    </form>
  )
}
