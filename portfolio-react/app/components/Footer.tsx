import { useTranslations } from 'next-intl';

const LINKS = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/heros-dinao', external: true },
    { label: 'GitHub', href: 'https://github.com/heros-s', external: true },
    { label: 'E-mail', href: 'mailto:herosdefreitas@gmail.com', external: false },
    { label: 'WhatsApp', href: 'https://wa.me/5541987537615', external: true },
]

export function Footer() {
    const t = useTranslations('footer');

    return (
        <footer className="border-t border-border">
            <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-4 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between md:px-10">
                <p className="flex flex-wrap gap-x-3 gap-y-1">
                    <span className="font-mono text-[13px]">{t('uptime')}</span>
                    <span aria-hidden="true">·</span>
                    <span>{t('copyright', { year: new Date().getFullYear() })}</span>
                </p>
                <ul className="flex flex-wrap gap-x-6 gap-y-2">
                    {LINKS.map((link) => (
                        <li key={link.label}>
                            <a
                                href={link.href}
                                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                className="inline-flex min-h-11 items-center text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-run md:min-h-0"
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    )
}
