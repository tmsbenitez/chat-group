import { JwtPayload } from 'jsonwebtoken'

export interface User {
  id: number
  created_at: Date
  name: string
  username: string
  password: string
  email: string
  avatar?: string
}

export interface AuxChildren {
  children: React.ReactNode
}

export interface LoginData {
  username: string
  password: string
}

export interface SignData {
  email: string
  username: string
  password: string
  name: string
  avatar: string
}

export interface Value {
  user?: User
  Login: (loginData: LoginData) => Promise<void>
}

export interface Children {
  children: React.ReactNode
}

export type Message = {
  id: number
  user: User | null
  message: string
}

export type Channel = {
  id: number
  created_at: Date
  name: string
  avatar?: string
  description?: string
  messages?: Object[]
  members: Object[]
  leader: User
  isPrivate: boolean
}