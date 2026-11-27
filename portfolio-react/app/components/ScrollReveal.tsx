'use client'

import { motion } from 'motion/react'

interface ScrollRevealProps {
    children: React.ReactNode
    delay?: number
    className?: string
}

// Entrada padrão de bloco (DESIGN.md §5): 12px + opacidade, 400ms, uma vez.
// Com prefers-reduced-motion o MotionProvider desliga o deslocamento e sobra só o fade.
export function ScrollReveal({ children, delay = 0, className }: ScrollRevealProps) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.4, ease: [0.2, 0, 0, 1], delay }}
        >
            {children}
        </motion.div>
    )
}
