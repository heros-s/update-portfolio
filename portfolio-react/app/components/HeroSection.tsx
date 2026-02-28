'use client'

import { useState, useEffect, useMemo } from 'react'
import { useTranslations } from 'next-intl';
import { ParticlesBackground } from './ParticlesBackground';

// Hero Section do portfólio
export function HeroSection() {
    const t = useTranslations('hero');
// Lista de textos que vão rotar
const phrases = useMemo(() => [
    t('typedPhrases.phrase1'),
    t('typedPhrases.phrase2'),
    t('typedPhrases.phrase3'),
    t('typedPhrases.phrase4'),
], [t])

const [displayText, setDisplayText] = useState('')
const [phraseIndex, setPhraseIndex] = useState(0)
const [isDeleting, setIsDeleting] = useState(false)
const [isPaused, setIsPaused] = useState(false) // <- novo

useEffect(() => {
    if (isPaused) return

    const currentPhrase = phrases[phraseIndex]

    const timeout = setTimeout(() => {
        if (!isDeleting) {
            const next = currentPhrase.slice(0, displayText.length + 1)
            setDisplayText(next)

            // Terminou de escrever — pausa antes de apagar
            if (next === currentPhrase) {
                setIsPaused(true)
                setTimeout(() => {
                    setIsPaused(false)
                    setIsDeleting(true)
                }, 2000)
            }
        } else {
            const next = currentPhrase.slice(0, displayText.length - 1)
            setDisplayText(next)

            // Terminou de apagar — troca a frase
            if (next === '') {
                setIsDeleting(false)
                setPhraseIndex((prev) => (prev + 1) % phrases.length)
            }
        }
    }, isDeleting ? 50 : 80)

    return () => clearTimeout(timeout)
}, [displayText, isDeleting, phraseIndex, isPaused, phrases])


    return (
        <section
            id="home"
            className="min-h-screen bg-linear-to-b from-black via-gray-900 to-black flex items-center justify-center pt-20 relative"
        >
            {/* Particles Background */}
            <ParticlesBackground />
            <div className="max-w-4xl mx-auto px-6 text-center">
                {/* Título Principal */}
                <p className="text-4xl md:text-5xl font-bold text-white mb-2">
                    {t('title')}
                </p>
                <h1 className="text-5xl md:text-7xl font-bold text-cyan-500 mb-6 min-h-[1.2em]">
                    {displayText}
                    <span className="animate-pulse">|</span>
                </h1>

                {/* Subtítulo */}
                <p className="text-xl md:text-2xl text-gray-300 mb-8">
                    {t('subtitle')}
                </p>

                {/* CTA Botões */}
                <div className="flex gap-4 justify-center flex-wrap">
                    <a
                        href="#projetos"
                        className="px-8 py-3 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition"
                    >
                        {t('ctaPrimary')}
                    </a>
                    <a
                        href="#contact"
                        className="px-8 py-3 border-2 border-cyan-500 text-cyan-500 font-bold rounded-lg hover:bg-cyan-500/10 transition"
                    >
                        {t('ctaSecondary')}
                    </a>
                </div>
            </div>
        </section>
    )
}