'use client'

import { useRouter, usePathname } from '../../i18n/navigation'
import { useLocale } from 'next-intl'

export function LanguageSwitcher() {
    const router = useRouter()
    const pathname = usePathname()
    const locale = useLocale()

    const isPT = locale === 'pt'

    function handleToggle() {
        const nextLocale = isPT ? 'en' : 'pt'
        router.replace(pathname, { locale: nextLocale })
    }

    return (
        <button
            onClick={handleToggle}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-700 hover:border-cyan-400 transition-all text-sm text-zinc-300 hover:text-white"
        >
            <span>{isPT ? '🇧🇷' : '🇺🇸'}</span>
            <span>{isPT ? 'Português' : 'English'}</span>
        </button>
    )
}