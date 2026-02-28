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
            {/* Floating Metric Cards — desktop only */}

            {/* Top Left */}
            <div className="hidden lg:block absolute top-[28%] left-[6%] animate-float-1">
                <div className="bg-zinc-900/90 backdrop-blur border border-zinc-700/60 rounded-xl px-5 py-4 w-50">
                    <p className="text-2xl font-bold text-cyan-400">~40h<span className="text-base text-zinc-400">{t('metrics.metric1Unit')}</span></p>
                    <p className="text-xs text-zinc-400 mt-1">{t('metrics.metric1')}</p>
                </div>
            </div>

            {/* Bottom Left */}
            <div className="hidden lg:block absolute top-[58%] left-[4%] animate-float-2">
                <div className="bg-zinc-900/80 backdrop-blur border border-zinc-700 rounded-xl px-5 py-4 w-46">
                    <p className="text-2xl font-bold text-cyan-400">+27%</p>
                    <p className="text-xs text-zinc-400 mt-1">{t('metrics.metric2')}</p>
                </div>
            </div>

            {/* Top Right */}
            <div className="hidden lg:block absolute top-[28%] right-[6%] animate-float-3">
                <div className="bg-zinc-900/80 backdrop-blur border border-zinc-700 rounded-xl px-5 py-4 w-46">
                    <p className="text-2xl font-bold text-cyan-400">150+</p>
                    <p className="text-xs text-zinc-400 mt-1">{t('metrics.metric3')}</p>
                </div>
            </div>

            {/* Bottom Right */}
            <div className="hidden lg:block absolute top-[58%] right-[4%] animate-float-4">
                <div className="bg-zinc-900/80 backdrop-blur border border-zinc-700 rounded-xl px-5 py-4 w-40">
                    <p className="text-2xl font-bold text-cyan-400">7</p>
                    <p className="text-xs text-zinc-400 mt-1">{t('metrics.metric4')}</p>
                </div>
            </div>

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