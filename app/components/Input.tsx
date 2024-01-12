import { ChangeEventHandler } from 'react'

interface Input {
  name?: string
  onChange?: ChangeEventHandler
  accept?: string
  value?: string
  type?: string
  text?: string
  placeholder?: string
  required?: boolean
  icon?: JSX.Element
  styleLabel?: string
  styleInput?: string
}

export function Input({
  name,
  onChange,
  accept,
  value,
  type,
  text,
  placeholder,
  required,
  icon,
  styleLabel,
  styleInput
}: Input) {
  return (
    <label className={styleLabel + ' relative flex flex-col gap-2 text-sm'}>
      {icon && (
        <i className='absolute inset-y-0 left-0 flex items-center pl-3'>
          {icon}
        </i>
      )}
      {text}
      <input
        accept={accept}
        required={required}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
        type={type}
        className={
          styleInput +
          ` bg-[#141414] rounded border border-transparent text-zinc-500 focus:text-zinc-300 duration-300 p-2 focus:border-green-600 focus:ring-0 outline-none ${
            icon ? 'pl-10 ' : 'pl-2 '
          }`
        }
      />
    </label>
  )
}
