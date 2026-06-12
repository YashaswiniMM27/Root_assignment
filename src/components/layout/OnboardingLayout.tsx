import { useEffect, type ReactNode } from 'react'

import contourBackground from '../../assets/images/onboardingPage/ContourBackground.svg'
import mobileContourBackground from '../../assets/images/onboardingPage/MobileContourBackground.svg'

interface OnboardingLayoutProps {
  children: ReactNode
}

export function OnboardingLayout({ children }: OnboardingLayoutProps) {
  useEffect(() => {
    function keepFocusedFieldVisible(event: FocusEvent) {
      if (window.matchMedia('(min-width: 1024px)').matches) return

      const target = event.target

      if (
        !(target instanceof HTMLInputElement) &&
        !(target instanceof HTMLTextAreaElement) &&
        !(target instanceof HTMLSelectElement)
      ) {
        return
      }

      window.setTimeout(() => {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest',
        })
      }, 300)
    }

    document.addEventListener('focusin', keepFocusedFieldVisible)

    return () => {
      document.removeEventListener('focusin', keepFocusedFieldVisible)
    }
  }, [])

  return (
    <main className="relative min-h-[100dvh] overflow-x-hidden overflow-y-auto bg-[#F6F7F9] px-5 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-10 sm:px-8 lg:flex lg:min-h-screen lg:items-center lg:overflow-hidden lg:px-16 lg:py-12">
      <img
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-fill lg:hidden"
        src={mobileContourBackground}
        alt=""
        aria-hidden="true"
      />
      <img
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 hidden h-[118%] w-[118%] max-w-none -translate-x-1/2 -translate-y-1/2 object-fill lg:block"
        src={contourBackground}
        alt=""
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto grid w-full max-w-[100rem] gap-2 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.82fr)] lg:items-center lg:gap-6">
        {children}
      </div>
    </main>
  )
}
