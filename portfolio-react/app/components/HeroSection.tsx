'use client'

import { motion, type Variants } from 'motion/react'
import { useLocale, useTranslations } from 'next-intl'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// Números reais dos cases (pjt1, pjt3, pjt6) e total de projetos.
const METRICS = [
    { value: '~40 h', unitKey: 'metrics.metric1Unit', labelKey: 'metrics.metric1' },
    { value: 'até 27%', valueEn: 'up to 27%', labelKey: 'metrics.metric2' },
    { value: '150+', labelKey: 'metrics.metric3' },
    { value: '7', labelKey: 'metrics.metric4' },
] as const

const STACK = ['power bi', 'n8n', 'python', 'postgresql', 'azure', 'apps script', 'javascript', 'next.js']

const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06 } },
}

const item: Variants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.2, 0, 0, 1] } },
}

export function HeroSection() {
    const t = useTranslations('hero')
    const isEn = useLocale() === 'en'

    return (
        <section id="home" className="border-b border-border pt-32 pb-16 md:pt-40 md:pb-20">
            <motion.div
                className="mx-auto flex max-w-[1200px] flex-col gap-10 px-4 md:px-10"
                variants={container}
                initial="hidden"
                animate="show"
            >
                <motion.p
                    variants={item}
                    className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[13px] text-muted-foreground"
                >
                    <span className="flex items-center gap-2.5">
                        <span aria-hidden="true" className="pulse-run size-2 rounded-full bg-run" />
                        {t('status')}
                    </span>
                    <span aria-hidden="true" className="hidden sm:inline">·</span>
                    <span>{t('shipped')}</span>
                </motion.p>

                {/* Título e subtítulo ficam fora da cascata: são o LCP e precisam
                    estar visíveis no HTML, sem esperar o JavaScript. */}
                <div className="flex flex-col gap-6">
                    <h1 className="max-w-[19ch] text-5xl leading-[0.98] font-bold tracking-[-0.03em] text-balance md:text-7xl lg:text-[5.5rem]">
                        {t('headline')}
                    </h1>
                    <p className="max-w-[60ch] text-lg leading-relaxed text-muted-foreground md:text-xl">
                        {t('subtitle')}
                    </p>
                </div>

                <motion.div variants={item} className="flex flex-wrap items-center gap-x-6 gap-y-3">
                    <a href="#projetos" className={cn(buttonVariants({ size: 'lg' }), 'h-11 px-5 text-[15px] font-semibold')}>
                        {t('ctaPrimary')}
                    </a>
                    <a
                        href="#contact"
                        className="text-[15px] text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-run"
                    >
                        {t('ctaSecondary')}
                    </a>
                </motion.div>

                <motion.div variants={item} className="flex flex-col gap-4 pt-6">
                    <h2 className="text-[13px] text-muted-foreground">{t('metricsLabel')}</h2>
                    <dl className="grid grid-cols-2 border-t border-border md:grid-cols-4">
                        {METRICS.map((m, i) => (
                            <div
                                key={m.labelKey}
                                className={cn(
                                    'flex flex-col gap-1.5 border-b border-border py-5 pr-4',
                                    i % 2 === 1 && 'pl-4 border-l md:border-l-0 md:pl-0',
                                    i > 0 && 'md:border-l md:pl-5'
                                )}
                            >
                                <dt className="order-2 text-sm leading-snug text-muted-foreground">{t(m.labelKey)}</dt>
                                <dd className="order-1 font-mono text-2xl font-medium tabular-nums md:text-[28px]">
                                    {'valueEn' in m && isEn ? m.valueEn : m.value}
                                    {'unitKey' in m && (
                                        <span className="text-base text-muted-foreground">{t(m.unitKey)}</span>
                                    )}
                                </dd>
                            </div>
                        ))}
                    </dl>
                    <p className="font-mono text-[13px] text-muted-foreground">
                        {t('stackLabel')}: {STACK.join(', ')}
                    </p>
                </motion.div>
            </motion.div>
        </section>
    )
}
