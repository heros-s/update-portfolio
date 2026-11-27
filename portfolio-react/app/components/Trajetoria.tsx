'use client'

import { useRef, useState, useSyncExternalStore } from 'react'
import {
    AnimatePresence,
    motion,
    useMotionValueEvent,
    useReducedMotion,
    useScroll,
} from 'motion/react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { ScrollReveal } from './ScrollReveal'

// Assinatura do site (DESIGN.md §2): a carreira como histórico de deploys que
// "roda" com o scroll. No desktop a seção fica fixa enquanto as linhas entram;
// no celular, ou com prefers-reduced-motion, o log aparece completo.

const DEPLOYS = [
    { key: 'exp3', version: 'v1.0', date: '2024-07' },
    { key: 'exp2', version: 'v2.0', date: '2025-05' },
    { key: 'exp1', version: 'v3.0', date: '2025-11' },
    { key: 'exp0', version: 'v4.0', date: '2026-07' },
] as const

// Progresso do scroll em que cada deploy entra; o último valor libera a linha de formação.
const THRESHOLDS = [0, 0.26, 0.48, 0.7]
const NEXT_DEPLOY_AT = 0.88

const PRINCIPLES = ['criticalThinking', 'softSkills', 'solidTech'] as const

function monthsSinceFirstDeploy(now: Date) {
    return Math.max(0, (now.getFullYear() - 2024) * 12 + now.getMonth() - 6)
}

const noopSubscribe = () => () => {}

const desktopQuery = '(min-width: 1024px)'
function subscribe(cb: () => void) {
    const mq = window.matchMedia(desktopQuery)
    mq.addEventListener('change', cb)
    return () => mq.removeEventListener('change', cb)
}
function useIsDesktop() {
    return useSyncExternalStore(
        subscribe,
        () => window.matchMedia(desktopQuery).matches,
        () => false
    )
}

export function Trajetoria() {
    const t = useTranslations('about')
    const reduce = useReducedMotion()
    const isDesktop = useIsDesktop()
    const pinned = isDesktop && !reduce

    const wrapperRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ['start start', 'end end'] })

    // Calculado só no cliente: a página é pré-renderizada no build e a data mudaria.
    const totalMonths = useSyncExternalStore(
        noopSubscribe,
        () => monthsSinceFirstDeploy(new Date()),
        () => null
    )

    const [progress, setProgress] = useState(0)
    useMotionValueEvent(scrollYProgress, 'change', (v) => {
        if (pinned) setProgress(Math.round(v * 100) / 100)
    })

    const p = pinned ? progress : 1
    const revealed = THRESHOLDS.filter((th) => p >= th).length
    const active = Math.max(0, revealed - 1)
    const showNext = p >= NEXT_DEPLOY_AT

    const shownMonths =
        totalMonths === null ? null : Math.round(Math.min(1, p / NEXT_DEPLOY_AT) * totalMonths)

    function formatDuration(total: number) {
        const years = Math.floor(total / 12)
        const months = total % 12
        const parts: string[] = []
        if (years > 0) parts.push(t('log.durationYears', { n: years }))
        if (months > 0 || years === 0) parts.push(t('log.durationMonths', { n: months }))
        return parts.join(` ${t('log.and')} `)
    }

    return (
        <section id="sobre" className="border-b border-border">
            <div ref={wrapperRef} className={cn('relative', pinned && 'h-[300vh]')}>
                <div
                    className={cn(
                        'mx-auto grid max-w-[1200px] gap-10 px-4 py-20 md:px-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16',
                        pinned && 'sticky top-16 h-[calc(100svh-4rem)] content-center py-10'
                    )}
                >
                    <div className="flex flex-col gap-5 lg:self-center">
                        <h2 className="text-3xl leading-[1.05] font-bold tracking-[-0.02em] text-balance md:text-[44px]">
                            {t('title')}
                        </h2>
                        <p className="max-w-[52ch] text-lg leading-relaxed text-muted-foreground">
                            {t('description')}
                        </p>
                        {pinned && (
                            <p className="font-mono text-[13px] text-muted-foreground" aria-hidden="true">
                                ↓ {t('log.scrollHint')}
                            </p>
                        )}
                    </div>

                    <div className="relative border border-border bg-sunken">
                        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-border px-5 py-3 font-mono text-[13px]">
                            <span className="text-muted-foreground">{t('log.title')}</span>
                            <span className="flex items-center gap-2 text-muted-foreground">
                                <span aria-hidden="true" className="pulse-run size-2 rounded-full bg-run" />
                                {t('log.runningFor')}{' '}
                                <span className="text-foreground tabular-nums">
                                    {shownMonths === null ? '…' : formatDuration(shownMonths)}
                                </span>
                            </span>
                        </div>

                        {pinned && (
                            <motion.span
                                aria-hidden="true"
                                className="absolute top-0 bottom-0 left-0 w-px origin-top bg-run"
                                style={{ scaleY: scrollYProgress }}
                            />
                        )}

                        <ol className="flex flex-col">
                            {DEPLOYS.map((d, i) => {
                                const isLast = i === DEPLOYS.length - 1
                                const isRevealed = i < revealed
                                const expanded = !pinned || i === active
                                const company = t(`experience.items.${d.key}.company`).split('•')[0].trim()

                                return (
                                    <motion.li
                                        key={d.key}
                                        layout={pinned ? 'position' : false}
                                        className={cn(
                                            'flex flex-col gap-1.5 border-b border-border px-5 py-4 transition-opacity duration-300',
                                            isRevealed ? 'opacity-100' : 'opacity-20',
                                            pinned && i === active && 'bg-surface'
                                        )}
                                    >
                                        <p className="flex flex-wrap gap-x-4 font-mono text-[13px]">
                                            <span className="text-muted-foreground">{d.date}</span>
                                            <span>{d.version}</span>
                                            {isLast ? (
                                                <span className="text-run">◐ {t('log.statusRunning')}</span>
                                            ) : (
                                                <span className="text-ok">● {t('log.statusOk')}</span>
                                            )}
                                        </p>
                                        <h3 className="text-[17px] leading-snug font-semibold">
                                            {t(`experience.items.${d.key}.title`)}
                                            <span className="font-normal text-muted-foreground"> · {company}</span>
                                        </h3>
                                        <AnimatePresence initial={false}>
                                            {expanded && (
                                                <motion.p
                                                    key="desc"
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
                                                    className="overflow-hidden text-[15px] leading-relaxed text-muted-foreground"
                                                >
                                                    {t(`experience.items.${d.key}.description`)}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </motion.li>
                                )
                            })}
                        </ol>

                        <p
                            className={cn(
                                'px-5 py-4 font-mono text-[13px] text-run transition-opacity duration-300',
                                pinned && !showNext ? 'opacity-20' : 'opacity-100'
                            )}
                        >
                            ▸ {t('log.nextDeploy')}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-[1200px] px-4 pb-20 md:px-10">
                <ScrollReveal className="flex flex-col gap-6 border-t border-border pt-10">
                    <h3 className="text-[13px] text-muted-foreground">{t('principlesTitle')}</h3>
                    <dl className="grid gap-8 md:grid-cols-3 md:gap-10">
                        {PRINCIPLES.map((k) => (
                            <div key={k} className="flex flex-col gap-2">
                                <dt className="text-lg font-semibold">{t(`differentiators.${k}.title`)}</dt>
                                <dd className="leading-relaxed text-muted-foreground">
                                    {t(`differentiators.${k}.description`)}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </ScrollReveal>
            </div>
        </section>
    )
}
