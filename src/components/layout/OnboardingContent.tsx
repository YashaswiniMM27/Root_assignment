import onboardingIllustration from '../../assets/images/onboardingPage/Illustration.svg'

export function OnboardingContent() {
  return (
    <section
      className="mx-auto flex w-full max-w-xl flex-col gap-14 font-['Rubik'] text-center lg:min-h-[calc(100vh-12rem)] lg:justify-between lg:gap-16 lg:text-left"
      aria-labelledby="onboarding-introduction-title"
    >
      <div>
        <p className="text-xl font-light leading-7 text-[#132C4A] sm:text-2xl sm:leading-8">
          Let&apos;s get started
        </p>
        <h1
          id="onboarding-introduction-title"
          className="mt-4 text-4xl font-bold leading-[1.125] text-[#132C4A] sm:text-5xl sm:leading-[54px]"
        >
          Create your account
        </h1>
        <p className="mx-auto mt-7 text-base font-normal leading-none text-[#132C4A] lg:mx-0">
          Follow the steps to create your account
        </p>
      </div>

      <img
        className="h-auto w-full"
        src={onboardingIllustration}
        alt="A person completing account setup steps"
      />
    </section>
  )
}
