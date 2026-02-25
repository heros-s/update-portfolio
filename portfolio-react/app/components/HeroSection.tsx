import { useTranslations } from 'next-intl';

// Hero Section do portfólio
export function HeroSection() {
    const t = useTranslations('hero');

    return (
        <section
            id="home"
            className="min-h-screen bg-linear-to-b from-black via-gray-900 to-black flex items-center justify-center pt-20"
        >
            <div className="max-w-4xl mx-auto px-6 text-center">
                {/* Título Principal */}
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                    {t('title')} <span className="text-cyan-500">{t('titleHighlight')}</span>
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