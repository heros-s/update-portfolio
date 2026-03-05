'use client'

import { useState, useEffect } from "react";
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Link, usePathname } from "../../i18n/navigation";

// Estrutura do Navbar
export function Navbar() {
    const t = useTranslations('nav');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const pathname = usePathname();

    // Impedir scroll do body quando o menu estiver aberto
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen]);

    useEffect(() => {
        // Lista dos IDs das tuas seções (tem que bater com o id= no HTML)
        const sectionIds = ['home', 'projetos', 'sobre', 'contact'];

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // Quando a seção entrar na tela, atualiza o estado
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        setActiveSection(id);
                        
                        // Atualiza o hash na URL sem recarregar a página
                        window.history.replaceState(null, '', `#${id}`);
                    }
                });
            },
            {
                // Considera "visível" quando 40% da seção estiver na tela
                threshold: 0.4,
            }
        );

        // Para cada id, busca o elemento no DOM e começa a observar
        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        // Cleanup: para de observar quando o componente sai da tela
        return () => observer.disconnect();
    }, [pathname]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <nav className="fixed top-0 w-full z-50 bg-black">
            <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">

                {/* Logo */}
                <div className="font-bold text-white text-lg">
                    {t('brandName')}
                </div>

                {/* Links Desktop */}
                <div className="hidden md:flex gap-8 items-center">
                    <Link
                        href="/#home"
                        className={`transition-all ${
                            activeSection === 'home'
                                ? 'text-cyan-400 font-medium'
                                : 'text-gray-300 hover:text-white'
                        }`}
                    >
                        {t('home')}
                    </Link>
                    <Link
                        href="/#projetos"
                        className={`transition-all ${
                            activeSection === 'projetos'
                                ? 'text-cyan-400 font-medium'
                                : 'text-gray-300 hover:text-white'
                        }`}
                    >
                        {t('projects')}
                    </Link>
                    <Link
                        href="/#sobre"
                        className={`transition-all ${
                            activeSection === 'sobre'
                                ? 'text-cyan-400 font-medium'
                                : 'text-gray-300 hover:text-white'
                        }`}
                    >
                        {t('about')}
                    </Link>
                    <LanguageSwitcher />
                    <Link
                    href="/#contact"
                    className={`px-4 py-2 rounded-lg transition-all font-medium ${
                        activeSection === 'contact'
                            ? 'bg-cyan-400 text-black ring-2 ring-cyan-300 ring-offset-2 ring-offset-black'
                            : 'bg-cyan-500 text-black hover:bg-cyan-400'
                    }`}
                    >
                        {t('contact')}
                    </Link>
                </div>

                {/* Botão Hambúrguer (Mobile) */}
                <button 
                    onClick={toggleMenu}
                    className="md:hidden flex text-white text-2xl hover:text-cyan-400 transition-all focus:outline-none"
                    aria-label={isMenuOpen ? t('closeMenu') : t('openMenu')}
                >
                    {isMenuOpen ? '\u2715' : '\u2630'}
                </button>
            </div>

            {/* Overlay Mobile */}
            {isMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-all duration-300"
                    onClick={closeMenu}
                />
            )}

            {/* Menu Lateral Mobile */}
            <div className={`fixed top-0 right-0 h-screen w-64 bg-zinc-950 border-l border-zinc-800 z-50 transform transition-all duration-300 ease-in-out md:hidden flex flex-col ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                {/* Header do Menu */}
                <div className="flex justify-between items-center p-6 border-b border-zinc-800">
                    <h2 className="text-xl font-bold text-white">{t('menu')}</h2>
                    <button 
                        onClick={closeMenu}
                        className="text-zinc-400 hover:text-cyan-400 transition-all text-2xl"
                        aria-label={t('closeMenu')}
                    >
                        {'\u2715'}
                    </button>
                </div>

                {/* Lista de Links */}
                <nav className="flex flex-col gap-2 p-6">
                    <Link href="/#home" onClick={closeMenu} className="block px-4 py-3 text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-lg transition-all">{t('home')}</Link>
                    <Link href="/#projetos" onClick={closeMenu} className="block px-4 py-3 text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-lg transition-all">{t('projects')}</Link>
                    <Link href="/#sobre" onClick={closeMenu} className="block px-4 py-3 text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-lg transition-all">{t('about')}</Link>
                    <Link href="/#contact" onClick={closeMenu} className="block px-4 py-3 text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-lg transition-all">{t('contact')}</Link>
                </nav>

                {/* Footer do Menu (CTA) */}
                <div className="p-6 border-t border-zinc-800 mt-auto flex flex-col gap-3">
                    <LanguageSwitcher />
                    <Link 
                        href="/#contact" 
                        onClick={closeMenu}
                        className="block w-full px-4 py-3 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition-all text-center"
                    >
                        {t('cta')}
                    </Link>
                </div>
            </div>
        </nav>
    )
}
