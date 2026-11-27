'use client'

import { useRouter, usePathname } from '../../i18n/navigation'
import { useLocale } from 'next-intl'
import { cn } from '@/lib/utils'

export function LanguageSwitcher({ className }: { className?: string }) {
    const router = useRouter()
    const pathname = usePathname()
    const locale = useLocale()

    const isPT = locale === 'pt'

    function handleToggle() {
        const nextLocale = isPT ? 'en' : 'pt'
        const currentHash = window.location.hash
        router.replace(pathname + currentHash, { locale: nextLocale })
    }

    return (
        <button
            type="button"
            onClick={handleToggle}
            aria-label={isPT ? 'Switch to English' : 'Mudar para português'}
            className={cn(
                'inline-flex min-h-11 items-center gap-1.5 font-mono text-[13px] text-muted-foreground transition-colors hover:text-foreground',
                className
            )}
        >
            <span className={cn(isPT && 'text-foreground')}>PT</span>
            <span aria-hidden="true">/</span>
            <span className={cn(!isPT && 'text-foreground')}>EN</span>
        </button>
    )
}
