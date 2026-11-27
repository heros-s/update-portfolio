"use client";
import { useForm, ValidationError } from '@formspree/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { ScrollReveal } from './ScrollReveal'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

type FieldName = 'name' | 'email' | 'subject' | 'message'

const CHANNELS = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/heros-dinao' },
    { label: 'WhatsApp', href: 'https://wa.me/5541987537615' },
    { label: 'E-mail', href: 'mailto:herosdefreitas@gmail.com' },
]

// Campo sem caixa: só o fio inferior, que vira âmbar no foco (DESIGN.md §4).
const controlClass =
    'h-auto rounded-none border-0 border-b border-border bg-transparent px-0 py-2.5 text-base shadow-none focus-visible:border-run focus-visible:ring-0 aria-invalid:border-fail aria-invalid:ring-0 md:text-base dark:bg-transparent'

export function ContactSection() {
    const t = useTranslations('contact');
    const [state, handleSubmit, reset] = useForm("mgolaqyj");
    const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({})

    function validate(name: FieldName, value: string) {
        let message = ''

        if (name === 'name' && value.trim().length < 2) {
            message = t('form.errors.name')
        }
        if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            message = t('form.errors.email')
        }
        if (name === 'subject' && value.trim().length < 3) {
            message = t('form.errors.subject')
        }
        if (name === 'message' && value.trim().length < 10) {
            message = t('form.errors.message')
        }

        setErrors(prev => ({ ...prev, [name]: message }))
    }

    const fieldProps = (name: FieldName) => ({
        id: name,
        name,
        required: true,
        'aria-invalid': errors[name] ? true : undefined,
        'aria-describedby': errors[name] ? `${name}-error` : undefined,
        onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => validate(name, e.target.value),
    })

    return (
        <div className="border-b border-border py-20 md:py-24">
            <ScrollReveal className="mx-auto grid max-w-[1200px] gap-10 px-4 md:px-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
                <div className="flex flex-col gap-5">
                    <h2 className="text-3xl leading-[1.05] font-bold tracking-[-0.02em] text-balance md:text-[44px]">
                        {t('title')}
                    </h2>
                    <p className="max-w-[52ch] text-lg leading-relaxed text-muted-foreground">{t('subtitle')}</p>
                    <div className="flex flex-col gap-2 pt-2">
                        <p className="text-sm text-muted-foreground">{t('channelsLabel')}</p>
                        <ul className="flex flex-wrap gap-x-6 gap-y-2">
                            {CHANNELS.map((c) => (
                                <li key={c.label}>
                                    <a
                                        href={c.href}
                                        {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                        className="inline-flex min-h-11 items-center underline decoration-border underline-offset-4 transition-colors hover:decoration-run"
                                    >
                                        {c.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border border-border bg-sunken">
                    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-border px-5 py-3 font-mono text-[13px] text-muted-foreground">
                        <span>{t('panelTitle')}</span>
                        <span>{t('form.status')}</span>
                    </div>

                    {state.succeeded ? (
                        <div className="flex flex-col items-start gap-4 px-5 py-8" role="status">
                            <p className="font-mono text-[13px] text-ok">● {t('successStatus')}</p>
                            <h3 className="text-2xl font-bold">{t('success.title')}</h3>
                            <p className="text-muted-foreground">{t('success.description')}</p>
                            <Button variant="outline" className="mt-2 h-11 rounded-[2px] px-5" onClick={() => { setErrors({}); reset() }}>
                                {t('success.backToForm')}
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6 px-5 py-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <Field>
                                    <FieldLabel htmlFor="name" className="text-sm text-muted-foreground">{t('form.name')}</FieldLabel>
                                    <Input type="text" autoComplete="name" className={controlClass} {...fieldProps('name')} />
                                    {errors.name && <FieldError id="name-error" className="text-fail">{errors.name}</FieldError>}
                                    <ValidationError prefix="Name" field="name" errors={state.errors} className="text-sm text-fail" />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="email" className="text-sm text-muted-foreground">{t('form.email')}</FieldLabel>
                                    <Input type="email" autoComplete="email" className={controlClass} {...fieldProps('email')} />
                                    {errors.email && <FieldError id="email-error" className="text-fail">{errors.email}</FieldError>}
                                    <ValidationError prefix="Email" field="email" errors={state.errors} className="text-sm text-fail" />
                                </Field>
                            </div>
                            <Field>
                                <FieldLabel htmlFor="subject" className="text-sm text-muted-foreground">{t('form.subject')}</FieldLabel>
                                <Input type="text" className={controlClass} {...fieldProps('subject')} />
                                {errors.subject && <FieldError id="subject-error" className="text-fail">{errors.subject}</FieldError>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="message" className="text-sm text-muted-foreground">{t('form.message')}</FieldLabel>
                                <Textarea rows={5} className={`${controlClass} min-h-32 resize-y`} {...fieldProps('message')} />
                                {errors.message && <FieldError id="message-error" className="text-fail">{errors.message}</FieldError>}
                                <ValidationError prefix="Message" field="message" errors={state.errors} className="text-sm text-fail" />
                            </Field>
                            <Button
                                type="submit"
                                disabled={state.submitting}
                                className="h-11 self-start rounded-[2px] px-6 text-[15px] font-semibold"
                            >
                                {state.submitting ? t('form.sending') : t('form.submit')}
                            </Button>
                        </form>
                    )}
                </div>
            </ScrollReveal>
        </div>
    );
}
