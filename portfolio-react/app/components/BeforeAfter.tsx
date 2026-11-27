'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import NumberFlow from '@number-flow/react'
import { cn } from '@/lib/utils'

export interface BeforeAfterCount {
    from: number
    to: number
    prefix?: string
    suffix?: string
}

interface BeforeAfterProps {
    before: string
    after: string
    count?: BeforeAfterCount
    labels: { before: string; after: string }
    className?: string
}

// "Antes → depois" (DESIGN.md §2): ao entrar na tela o antes é riscado e o depois
// aparece; quando há número, ele desce do valor antigo até o novo.
export function BeforeAfter({ before, after, count, labels, className }: BeforeAfterProps) {
    const ref = useRef<HTMLSpanElement>(null)
    const inView = useInView(ref, { once: true, margin: '-15% 0px' })

    return (
        <span ref={ref} className={cn('flex flex-wrap items-baseline gap-x-2 gap-y-1 font-mono', className)}>
            <span className="sr-only">{labels.before}:</span>
            <span className="relative self-start text-muted-foreground">
                {before}
                <motion.span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-1/2 h-px origin-left bg-muted-foreground"
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : undefined}
                    transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
                />
            </span>
            <span className="flex items-baseline gap-x-2">
                <span aria-hidden="true" className="text-muted-foreground">→</span>
                <span className="sr-only">{labels.after}:</span>
                <motion.span
                    className="text-foreground"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : undefined}
                    transition={{ duration: 0.3, delay: 0.3 }}
                >
                    {count ? (
                        <>
                            <NumberFlow
                                value={inView ? count.to : count.from}
                                prefix={count.prefix}
                                suffix={count.suffix}
                                aria-hidden="true"
                                transformTiming={{ duration: 900, easing: 'cubic-bezier(0.2, 0, 0, 1)' }}
                            />
                            <span className="sr-only">{after}</span>
                        </>
                    ) : (
                        after
                    )}
                </motion.span>
            </span>
        </span>
    )
}
