import { useCallback, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'motion/react'
import { Sparkles } from './components/effects/Sparkles'
import { AskNameStep } from './components/steps/AskNameStep'
import { EnvelopeStep } from './components/steps/EnvelopeStep'
import { InvitationStep } from './components/steps/InvitationStep'
import { StoryStep } from './components/steps/StoryStep'
import { WelcomeStep } from './components/steps/WelcomeStep'
import { useGuestName } from './hooks/useGuestName'

type Step = 'envelope' | 'welcome' | 'askName' | 'story' | 'invitation'

export default function App() {
  const { name, setName, hasUrlName } = useGuestName()
  const [step, setStep] = useState<Step>(() => {
    // Dev only: ?step=invitation để nhảy thẳng tới một bước khi chỉnh UI
    const s = import.meta.env.DEV || import.meta.env.VITE_SHOT ? new URLSearchParams(window.location.search).get('step') : null
    return (s as Step | null) ?? 'envelope'
  })

  const goAfterWelcome = useCallback(() => setStep(hasUrlName ? 'story' : 'askName'), [hasUrlName])

  return (
    <MotionConfig reducedMotion="user">
      <main className="noir-bg relative min-h-dvh overflow-hidden">
        <Sparkles />
        <AnimatePresence mode="wait">
          {step === 'envelope' && <EnvelopeStep key="envelope" onOpened={() => setStep('welcome')} />}
          {step === 'welcome' && <WelcomeStep key="welcome" onNext={goAfterWelcome} />}
          {step === 'askName' && (
            <AskNameStep
              key="askName"
              initialName={name}
              onSubmit={(n) => {
                setName(n)
                setStep('story')
              }}
            />
          )}
          {step === 'story' && <StoryStep key="story" name={name} onDone={() => setStep('invitation')} />}
          {step === 'invitation' && <InvitationStep key="invitation" name={name} onReplay={() => setStep('envelope')} />}
        </AnimatePresence>
      </main>
    </MotionConfig>
  )
}
