import { useTranslations } from 'next-intl';

interface ProjectSolutionProps {
  solucao: string
  tecnologias: string[]
}

export function ProjectSolution({ solucao, tecnologias }: ProjectSolutionProps) {
  const t = useTranslations('projectPage.sections');

  return (
    <section className="bg-zinc-900/50 text-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-8">{t('solution')}</h2>
        
        {/* Texto da solução */}
        <div className="mb-10">
          <p className="text-lg text-zinc-300 leading-relaxed">
            {solucao}
          </p>
        </div>

        {/* Stack usada na solução */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-cyan-400">{t('techStack')}</h3>
          <div className="flex flex-wrap gap-3">
            {tecnologias.map((tech) => (
              <span 
                key={tech}
                className="px-4 py-2 bg-cyan-500/20 border border-cyan-500 rounded-full text-sm text-cyan-400"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}