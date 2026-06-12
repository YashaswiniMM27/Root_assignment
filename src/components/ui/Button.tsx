import type { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'border-2 border-[#0054FD] bg-[#0054FD] text-white hover:border-[#0048D9] hover:bg-[#0048D9] disabled:border-[#D9E0E6] disabled:bg-[#D9E0E6] disabled:text-[#8A99A8]',
  secondary:
    'border-2 border-[#D9E0E6] bg-white text-[#0054FD] hover:border-[#0054FD] hover:bg-[#F7FAFF] disabled:border-[#D9E0E6] disabled:bg-white disabled:text-[#A6B1BC]',
}

export function Button({
  className = '',
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex min-h-12 w-full items-center justify-center rounded-[38px] px-5 py-3 font-['Rubik'] text-sm font-medium leading-none transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0054FD] disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`}
      {...props}
    />
  )
}
