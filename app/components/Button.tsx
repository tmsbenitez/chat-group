interface Button {
  text: string
  styles?: string
  icon?: JSX.Element
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export function Button({ text, styles, icon, onClick }: Button) {
  return (
    <button
      onClick={onClick}
      className={
        styles +
        ' border border-zinc-800 w-full py-2 rounded text-sm mx-auto hover:border-zinc-700 duration-300 hover:bg-zinc-900'
      }
    >
      {icon}{text}
    </button>
  )
}
