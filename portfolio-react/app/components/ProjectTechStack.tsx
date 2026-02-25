import { useTranslations } from 'next-intl';

interface ProjectTechStackProps {
  tecnologias: string[]
  categorias: string[]
  desafios: string | string[]
}

export function ProjectTechStack({ tecnologias, categorias, desafios }: ProjectTechStackProps) {
  const t = useTranslations('projectPage.sections');

  return (
    <section className="bg-zinc-900/50 text-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-8">{t('techStack')}</h2>

        {/* Categorias */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-3 text-cyan-400">{t('overview')}</h3>
          <div className="flex flex-wrap gap-2">
            {categorias.map((cat, index) => (
              <p key={index} className="text-lg text-zinc-300 capitalize">
                {cat}{index < categorias.length - 1 ? "," : ""}
              </p>
            ))}
          </div>
        </div>

        {/* Stack de tecnologias */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4 text-cyan-400">{t('technicalStack')}</h3>
          <div className="flex flex-wrap gap-3">
            {tecnologias.map((tech) => (
              <span 
                key={tech}
                className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-zinc-300 hover:border-cyan-400 transition"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Desafios */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-cyan-400">{t('challenges')}</h3>
          {Array.isArray(desafios) ? (
            <ul className="list-disc list-inside space-y-2 text-zinc-300">
              {desafios.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-zinc-300 leading-relaxed">
              {desafios}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}