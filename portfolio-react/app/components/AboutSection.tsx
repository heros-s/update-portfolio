import { SiN8N } from "react-icons/si";
import { BsFileEarmarkBarGraph } from "react-icons/bs";
import { TrendingUp } from "lucide-react";
import { useTranslations } from 'next-intl';

export function AboutSection() {
  const t = useTranslations('about');

  return (
    <section id="sobre" className="bg-zinc-950 text-white min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Intro + Diferencial */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Coluna Esquerda: Intro */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('title')}
            </h1>
            <p className="text-lg text-zinc-400 mb-6">
              {t('description')}
            </p>
            <div className="flex gap-4">
              <a 
                href="#projetos" 
                className="px-6 py-3 bg-cyan-400 text-black font-semibold rounded-lg hover:bg-cyan-300 transition-all"
              >
                {t('viewProjects')}
              </a>
            </div>
          </div>

          {/* Coluna Direita: Diferenciais */}
          <div className="space-y-4">
            <div className="border-l-4 border-cyan-400 pl-4">
              <h3 className="font-bold text-white mb-1">{t('differentiators.criticalThinking.title')}</h3>
              <p className="text-sm text-zinc-400">
                {t('differentiators.criticalThinking.description')}
              </p>
            </div>
            <div className="border-l-4 border-cyan-400 pl-4">
              <h3 className="font-bold text-white mb-1">{t('differentiators.softSkills.title')}</h3>
              <p className="text-sm text-zinc-400">
                {t('differentiators.softSkills.description')}
              </p>
            </div>
            <div className="border-l-4 border-cyan-400 pl-4">
              <h3 className="font-bold text-white mb-1">{t('differentiators.solidTech.title')}</h3>
              <p className="text-sm text-zinc-400">
                {t('differentiators.solidTech.description')}
              </p>
            </div>
          </div>
        </div>

        {/* Skills Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 hover:border-cyan-400 transition-all">
            <div className="mb-3 text-cyan-400">
              <SiN8N size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">{t('skills.automation.title')}</h3>
            <p className="text-sm text-zinc-400">{t('skills.automation.description')}</p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 hover:border-cyan-400 transition-all">
            <div className="mb-3 text-cyan-400">
              <BsFileEarmarkBarGraph size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">{t('skills.dataBI.title')}</h3>
            <p className="text-sm text-zinc-400">{t('skills.dataBI.description')}</p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 hover:border-cyan-400 transition-all">
            <div className="mb-3 text-cyan-400">
              <TrendingUp size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">{t('skills.strategyIA.title')}</h3>
            <p className="text-sm text-zinc-400">{t('skills.strategyIA.description')}</p>
          </div>
        </div>

        {/* Timeline de Experiência */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">{t('experience.title')}</h2>
          <div className="space-y-6">
            {/* Item 1 */}
            <div className="flex gap-4">
              <div className="w-2 bg-cyan-400 rounded shrink-0"></div>
              <div>
                <h3 className="font-bold text-lg">{t('experience.items.exp1.title')}</h3>
                <p className="text-sm text-zinc-400">
                  {t('experience.items.exp1.company')}
                </p>
                <p className="text-sm text-zinc-300 mt-2">
                  {t('experience.items.exp1.description')}
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex gap-4">
              <div className="w-2 bg-cyan-400 rounded shrink-0"></div>
              <div>
                <h3 className="font-bold text-lg">{t('experience.items.exp2.title')}</h3>
                <p className="text-sm text-zinc-400">
                    {t('experience.items.exp2.company')}
                </p>
                <p className="text-sm text-zinc-300 mt-2">
                  {t('experience.items.exp2.description')}
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex gap-4">
              <div className="w-2 bg-cyan-400 rounded shrink-0"></div>
              <div>
                <h3 className="font-bold text-lg">{t('experience.items.exp3.title')}</h3>
                <p className="text-sm text-zinc-400">
                    {t('experience.items.exp3.company')}
                </p>
                <p className="text-sm text-zinc-300 mt-2">
                  {t('experience.items.exp3.description')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Formação Acadêmica */}
        <div className="bg-zinc-900 p-8 rounded-lg border border-zinc-800">
          <h2 className="text-2xl font-bold mb-4">{t('education.title')}</h2>
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="text-lg font-bold">{t('education.degree')}</h3>
              <p className="text-zinc-400">{t('education.period')}</p>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-zinc-400">{t('education.progress')}</p>
                <span className="text-sm font-bold text-cyan-400">87.5%</span>
              </div>
              <div className="w-full bg-zinc-700 rounded-full h-3 overflow-hidden">
                <div className="bg-cyan-400 h-full rounded-full transition-all duration-1000 w-[87.5%]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
