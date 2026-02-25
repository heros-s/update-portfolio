import { useTranslations } from 'next-intl';

// Este é um exemplo para você entender o padrão
interface ProjectProblemProps {
  problema: string
}

export function ProjectProblem({ problema }: ProjectProblemProps) {
  const t = useTranslations('projectPage.sections');

  return (
    <section className="bg-zinc-950 text-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-8">{t('problem')}</h2>
        <div className="border-l-4 border-cyan-400 pl-6">
          <p className="text-lg text-zinc-300 leading-relaxed">
            {problema}
          </p>
        </div>
      </div>
    </section>
  )
}