'use client'

import { useState, useEffect } from "react";
import { useTranslations } from 'next-intl';
import { MenuIcon } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Link, usePathname } from "../../i18n/navigation";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SECTIONS = [
    { id: 'projetos', key: 'projects' },
    { id: 'sobre', key: 'about' },
] as const

export function Navbar() {
    const t = useTranslations('nav');
    const [activeSection, setActiveSection] = useState('home');
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const sectionIds = ['home', 'projetos', 'sobre', 'contact'];

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        setActiveSection(id);
                        window.history.replaceState(null, '', `#${id}`);
                    }
                });
            },
            // Uma linha no meio da tela: funciona para seções de qualquer altura
            // (a trajetória tem 300vh e nunca chegaria a 40% visível).
            { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
        );

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [pathname]);

    return (
        <header className="fixed top-0 z-50 w-full border-b border-border bg-background">
            <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 md:px-10">
                <Link href="/#home" className="text-[17px] font-bold">
                    {t('brandName')}
                </Link>

                <nav aria-label="Principal" className="hidden items-center gap-8 md:flex">
                    {SECTIONS.map(({ id, key }) => (
                        <Link
                            key={id}
                            href={`/#${id}`}
                            aria-current={activeSection === id ? 'location' : undefined}
                            className={cn(
                                'text-[15px] transition-colors',
                                activeSection === id ? 'text-run' : 'text-foreground hover:text-run'
                            )}
                        >
                            {t(key)}
                        </Link>
                    ))}
                    <LanguageSwitcher />
                    <Link href="/#contact" className={cn(buttonVariants(), 'h-9 px-4 text-[15px] font-semibold')}>
                        {t('contact')}
                    </Link>
                </nav>

                <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
                    <SheetTrigger
                        className="-mr-2 inline-flex size-11 items-center justify-center text-foreground md:hidden"
                        aria-label={t('openMenu')}
                    >
                        <MenuIcon className="size-5" aria-hidden="true" />
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[82%] gap-0 border-border bg-background p-0">
                        <SheetTitle className="border-b border-border px-6 py-5 text-[15px] font-bold">
                            {t('menu')}
                        </SheetTitle>
                        <nav aria-label="Principal" className="flex flex-col px-6 py-2">
                            {[{ id: 'home', key: 'home' } as const, ...SECTIONS, { id: 'contact', key: 'contact' } as const].map(({ id, key }) => (
                                <SheetClose
                                    key={id}
                                    render={<Link href={`/#${id}`} />}
                                    className={cn(
                                        'border-b border-border py-4 text-xl font-semibold',
                                        activeSection === id ? 'text-run' : 'text-foreground'
                                    )}
                                >
                                    {t(key)}
                                </SheetClose>
                            ))}
                        </nav>
                        <div className="mt-auto flex items-center justify-between border-t border-border px-6 py-4">
                            <LanguageSwitcher />
                            <SheetClose
                                render={<Link href="/#contact" />}
                                className={cn(buttonVariants(), 'h-11 px-5 text-[15px] font-semibold')}
                            >
                                {t('cta')}
                            </SheetClose>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    )
}
