'use client'

import { supabase } from '../supabase'
import jwt from 'jsonwebtoken'
import { useContext, createContext, useState, useEffect } from 'react'
import { AuxChildren, User, LoginData, SignData, Value } from '../types'
import { useRouter } from 'next/navigation'

const UserContext = createContext(null)

export const useUser = () => {
  return useContext(UserContext)
}

function UserProvider({ children }: AuxChildren) {
  const [loggedUser, setLoggedUser] = useState<any>()
  const router = useRouter()

  const secret = 'MySecretKEYjwt'
  const generateToken = (userData: User) => {
    const token = jwt.sign(userData, secret, {
      expiresIn: 60 * 60 * 24 * 7
    })
    return token
  }

  const Login = async (loginData: LoginData) => {
    const { data }: any = await supabase
      .from('user')
      .select()
      .eq('username', loginData.username)
      .eq('password', loginData.password)

    if (data && data.length > 0) {
      const token = generateToken(data[0])

      localStorage.setItem('token', token)
      setLoggedUser(jwt.decode(token))
      router.push('/')
    }
  }

  const SignUp = async (signData: SignData) => {
    const { data }: any = await supabase
      .from('user')
      .insert([signData])
      .select()

    if (data && data.length > 0) {
      const token = generateToken(data[0])

      localStorage.setItem('token', token)
      setLoggedUser(jwt.decode(token))
      router.push('/')
    }
  }

  const LogOut = () => {
    localStorage.removeItem('token')
    setLoggedUser(null)
    router.push('/login')
  }

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      router.push('/login')
    }

    setLoggedUser(token ? jwt.decode(token) : null)
  }, [])

  const value: Value | any = { Login, SignUp, LogOut, loggedUser }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export default UserProvider
