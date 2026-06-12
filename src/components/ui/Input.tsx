import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export function Input({ id, label, className = '', ...props }: InputProps) {
  return (
    <label
      className="block font-['Rubik'] text-sm font-normal leading-4 text-[#8292A1]/80"
      htmlFor={id}
    >
      {label}
      <input
        id={id}
        className={`mt-2 min-h-[52px] w-full rounded-xl border border-[#729CF0] bg-white px-5 font-['Rubik'] text-base font-normal leading-6 text-[#132C4A] outline-none placeholder:text-sm placeholder:text-[#8292A1]/40 focus:border-[#0054FD] ${className}`}
        {...props}
      />
    </label>
  )
}
