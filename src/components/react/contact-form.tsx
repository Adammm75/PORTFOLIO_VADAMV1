import { EASE } from '@/components/react/motion-primitives'
import { SITE } from '@/consts'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react'
import { useState } from 'react'

/** Getform.io endpoint backing the form. */
const FORM_ENDPOINT = 'https://getform.io/f/bqoopvvb'

type Status = 'idle' | 'sending' | 'success' | 'error'
type Errors = Partial<Record<'name' | 'email' | 'message', string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values: {
  name: string
  email: string
  message: string
}): Errors {
  const errors: Errors = {}
  if (!values.name.trim()) errors.name = 'Merci d’indiquer votre nom.'
  if (!values.email.trim()) errors.email = 'Merci d’indiquer votre e-mail.'
  else if (!EMAIL_PATTERN.test(values.email))
    errors.email = 'Cette adresse e-mail semble invalide.'
  if (values.message.trim().length < 10)
    errors.message = 'Votre message doit faire au moins 10 caractères.'
  return errors
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-muted-foreground mb-2 block font-mono text-[0.68rem] tracking-[0.16em] uppercase"
      >
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            id={`${id}-error`}
            role="alert"
            className="text-destructive mt-2 flex items-center gap-1.5 text-xs"
          >
            <AlertCircle className="size-3.5 shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

const inputClass = cn(
  'border-border bg-background/60 text-foreground placeholder:text-muted-foreground/70 w-full rounded-xl border px-4 py-3.5 text-sm',
  'transition-colors duration-300 outline-none focus:border-[var(--ring)]',
  'aria-[invalid=true]:border-destructive',
)

function ContactFormContent() {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Errors>({})
  const [feedback, setFeedback] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Keep a reference: `currentTarget` is nulled once we await.
    const form = event.currentTarget
    const data = new FormData(form)
    const values = {
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      message: String(data.get('message') ?? ''),
    }

    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setStatus('error')
      setFeedback('Quelques champs demandent votre attention.')
      return
    }

    setStatus('sending')
    setFeedback('')

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...values,
          subject: 'Nouveau message depuis le portfolio',
          portfolio: `${SITE.title} — Portfolio Contact`,
        }),
      })

      if (!response.ok) throw new Error(`Réponse ${response.status}`)

      form.reset()
      setStatus('success')
      setFeedback(
        'Message envoyé. Je vous réponds dans les plus brefs délais — merci !',
      )
    } catch {
      // Last resort: hand the message to the visitor's mail client.
      const subject = encodeURIComponent('Contact depuis votre portfolio')
      const body = encodeURIComponent(
        `Nom : ${values.name}\nEmail : ${values.email}\n\nMessage :\n${values.message}`,
      )
      window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`
      setStatus('error')
      setFeedback(
        "L'envoi automatique a échoué : votre logiciel de messagerie vient de s'ouvrir avec le message pré-rempli.",
      )
    }
  }

  const clearError = (field: keyof Errors) =>
    setErrors((current) => ({ ...current, [field]: undefined }))

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: EASE }}
      className="panel p-6 sm:p-8"
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <Field id="name" label="Nom" error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Votre nom"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            onChange={() => clearError('name')}
            className={inputClass}
          />
        </Field>

        <Field id="email" label="E-mail" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="vous@exemple.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            onChange={() => clearError('email')}
            className={inputClass}
          />
        </Field>

        <Field id="message" label="Message" error={errors.message}>
          <textarea
            id="message"
            name="message"
            rows={6}
            placeholder="Décrivez votre projet ou votre demande…"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'message-error' : undefined}
            onChange={() => clearError('message')}
            className={cn(inputClass, 'resize-none')}
          />
        </Field>

        <button
          type="submit"
          disabled={status === 'sending'}
          data-cursor-label="envoyer"
          className={cn(
            'bg-primary text-primary-foreground sheen relative flex w-full items-center justify-center gap-2 overflow-hidden',
            'rounded-full px-6 py-3.5 text-sm font-semibold transition-opacity duration-300',
            'disabled:cursor-not-allowed disabled:opacity-60',
          )}
        >
          {status === 'sending' ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Envoi en cours…
            </>
          ) : (
            <>
              <Send className="size-4" />
              Envoyer le message
            </>
          )}
        </button>

        <AnimatePresence>
          {feedback && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              role="status"
              aria-live="polite"
              className={cn(
                'flex items-start gap-2 rounded-xl border px-4 py-3 text-sm',
                status === 'success'
                  ? 'border-[color-mix(in_oklab,var(--success)_45%,transparent)] text-[var(--success)]'
                  : 'border-[color-mix(in_oklab,var(--destructive)_45%,transparent)] text-[var(--destructive)]',
              )}
            >
              {status === 'success' ? (
                <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
              ) : (
                <AlertCircle className="mt-0.5 size-4 shrink-0" />
              )}
              {feedback}
            </motion.p>
          )}
        </AnimatePresence>

        <p className="text-muted-foreground text-center text-xs">
          Ou écrivez-moi directement à{' '}
          <a
            href={`mailto:${SITE.email}`}
            className="text-foreground link-underline"
          >
            {SITE.email}
          </a>
        </p>
      </form>
    </motion.div>
  )
}

/**
 * Honours `prefers-reduced-motion` for every animation in this island:
 * framer skips transform and layout animations, opacity fades stay.
 */
export default function ContactForm() {
  return (
    <MotionConfig reducedMotion="user">
      <ContactFormContent />
    </MotionConfig>
  )
}
