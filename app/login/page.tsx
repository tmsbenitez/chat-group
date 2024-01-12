import { LoginForm } from '../components/Form/LoginForm'
import { RiChatSmile3Fill } from 'react-icons/ri'
import Link from 'next/link'

const LoginPage = () => {
  return (
    <main className='w-full p-6 flex items-center h-screen'>
      <section className='hidden md:flex relative items-center justify-between border border-zinc-800 bg-[#101010] h-[95vh] rounded-lg w-full'>
        <div className='w-full lg:w-1/2 flex justify-center'>
          <LoginForm />
        </div>
        <div className='relative w-1/2 mesher rounded-r-lg opacity-80 h-[95vh] hidden lg:flex'>
          <Link
            target='_blank'
            href='https://tmsbenitez.ar'
            className='absolute right-4 bottom-4 text-black'
          >
            Designed and Built by Tomas Benitez
          </Link>
        </div>
        <div className='absolute top-5 left-5 flex items-center text-lg text-green-500 gap-1 pointer-events-none font-medium'>
          <RiChatSmile3Fill className='fill-green-500 w-12 h-12' /> Glow
        </div>
      </section>
    </main>
  )
}

export default LoginPage
