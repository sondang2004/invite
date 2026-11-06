import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'motion/react'
import campus from './assets/trinh-campus.jpg'
import cool from './assets/trinh-cool.jpg'
import cute from './assets/trinh-cute.jpg'
import cutout from './assets/trinh-cutout.png'
import danceno from './assets/trinh-dance-no.png'
import dance from './assets/trinh-dance.jpg'
import puton from './assets/trinh-puton.jpg'
import ufm from './assets/trinhn-ufm.jpg'
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

  // Preload ảnh để chuyển cảnh không bị giật
  useEffect(() => {
    ;[campus, cool, cute, cutout, danceno, dance, puton, ufm].forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [])

  const goAfterWelcome = useCallback(() => setStep(hasUrlName ? 'story' : 'askName'), [hasUrlName])

  return (
    <MotionConfig reducedMotion="user">
      <main className="paper relative min-h-dvh overflow-hidden">
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
