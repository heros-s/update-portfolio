'use client'

import { MotionConfig } from 'motion/react'

// reducedMotion="user": com prefers-reduced-motion, o motion pula animações de
// transform/layout em todo o site e mantém só opacidade.
export function MotionProvider({ children }: { children: React.ReactNode }) {
    return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
