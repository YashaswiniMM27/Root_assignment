import { useEffect, useRef, type ReactNode } from 'react'

interface ModalProps {
  ariaLabelledBy: string
  children: ReactNode
  isOpen: boolean
  onClose?: () => void
}

export function Modal({
  ariaLabelledBy,
  children,
  isOpen,
  onClose,
}: ModalProps) {
  const dialogRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose?.()
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#363636]/75 p-5 animate-modal-backdrop"
      role="presentation"
    >
      <section
        ref={dialogRef}
        className="w-full max-w-[470px] rounded-2xl bg-white p-6 shadow-[0_24px_70px_rgb(19_44_74/0.24)] outline-none animate-modal-content sm:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby={ariaLabelledBy}
        tabIndex={-1}
      >
        {children}
      </section>
    </div>
  )
}
