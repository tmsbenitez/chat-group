export default function Header({ text }: { text: string }) {
  return (
    <header className='flex p-5 border-b w-full h-16 items-center justify-between border-zinc-800'>
      <p>{text}</p>
    </header>
  )
}
