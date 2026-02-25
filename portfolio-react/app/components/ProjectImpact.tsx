import { useTranslations } from 'next-intl';

interface Metricas {
  [key: string]: { label: string; value: string | number }
}

interface ProjectImpactProps {
  impacto: string | string[]
  metricas: Metricas
}

export function ProjectImpact({ impacto, metricas }: ProjectImpactProps) {
  const t = useTranslations('projectPage.sections');

  return (
    <section className="bg-zinc-950 text-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-8">{t('impact')}</h2>

        {/* Descrição do impacto */}
        <div className="mb-12">
          {Array.isArray(impacto) ? (
            <ul className="list-disc list-inside space-y-2 text-lg text-zinc-300">
              {impacto.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-lg text-zinc-300 leading-relaxed">
              {impacto}
            </p>
          )}
        </div>

        {/* Métricas em cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(metricas).map(([chave, item]) => (
            <div 
              key={chave}
              className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 hover:border-cyan-400 transition"
            >
              <h3 className="text-cyan-400 text-sm uppercase font-semibold mb-2">
                {item.label}
              </h3>
              <p className="text-3xl font-bold text-white">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}