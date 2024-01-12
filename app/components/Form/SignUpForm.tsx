'use client'

import { useUser } from '../../context/UserProvider'
import { SignData } from '../../types'
import React, { useState, useEffect } from 'react'
import { Input } from '../../components/Input'
import { RiErrorWarningLine, RiArrowLeftLine } from 'react-icons/ri'
import { Button } from '.././Button'
import Link from 'next/link'

export function SignUpForm() {
  const { SignUp }: any = useUser()
  const [error, setError] = useState<boolean>(false)
  const [step, setStep] = useState<number>(1)
  const [signData, setSignData] = useState<SignData>({
    username: '',
    email: '',
    password: '',
    name: '',
    avatar: ''
  })
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (signData.password !== confirmPassword) {
      setError(true)
      return
    }

    if (step !== 2) {
      setStep(step + 1)
      return
    }
    SignUp(signData) && setError(false)
  }

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target

    if (name === 'password') {
      setSignData({ ...signData, password: value })
    } else if (name === 'confirm') {
      setConfirmPassword(value)
    } else {
      setSignData({
        ...signData,
        [name]: value
      })
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='relative flex flex-col py-12 px-6 lg:px-16 gap-6 w-[500px] min-h-[600px] lg:border rounded-lg border-zinc-800'
    >
      <div className='flex flex-col gap-2 py-4'>
        <h2 className='text-center text-2xl tracking-wide flex items-center font-medium gap-2 justify-center'>
          Create an account
        </h2>
        <span className='text-center text-xs opacity-50 font-light'>
          Step {step} of 2
        </span>
      </div>
      {step === 1 ? (
        <div className='flex flex-col gap-6'>
          <Input
            placeholder='example@gmail.com'
            text='Email'
            name='email'
            onChange={handleChange}
            value={signData.email}
            type='email'
            required={true}
          />
          <Input
            text='Name'
            name='name'
            onChange={handleChange}
            value={signData.name}
            placeholder='Glow Name'
            required={true}
          />
          <Input
            text='Username'
            name='username'
            onChange={handleChange}
            value={signData.username}
            placeholder='glow.username'
            required={true}
          />
        </div>
      ) : (
        <div className='flex flex-col gap-6'>
          <Input
            text='Password'
            name='password'
            onChange={handleChange}
            value={signData.password}
            type='password'
            required={true}
          />
          <Input
            text='Confirm Password'
            name='confirm'
            onChange={handleChange}
            value={confirmPassword}
            type='password'
            required={true}
          />
        </div>
      )}
      <div className='flex flex-col gap-6 justify-center '>
        {error && (
          <p className='text-sm text-red-500 flex items-center gap-1'>
            <RiErrorWarningLine /> Password mismatch
          </p>
        )}
        <Button text={step === 2 ? 'Sign Up' : 'Next'} />
        {step === 2 && (
          <button
            className='text-xs mr-auto text-green-500 flex items-center hover:underline'
            onClick={() => setStep(step - 1)}
          >
            <RiArrowLeftLine />
            Back
          </button>
        )}
        <p className='text-xs text-center'>
          Already have an account?{' '}
          <Link
            href='/login'
            className='hover:underline duration-300 text-green-500 cursor-pointer'
          >
            Log In
          </Link>
        </p>
      </div>
    </form>
  )
}
