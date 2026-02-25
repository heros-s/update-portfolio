'use client'

import Image from 'next/image'
import { FaReact, FaNodeJs } from 'react-icons/fa'
import { SiNextdotjs, SiJavascript, SiTailwindcss, SiPostgresql, SiPython, SiN8N } from 'react-icons/si'
import { VscAzure } from 'react-icons/vsc'

interface Stack {
  name: string
  icon: React.ElementType | string
  color?: string
  isImage?: boolean
}

const stacks: Stack[] = [
  { name: 'Power BI', icon: '/power-bi.png', isImage: true },
  { name: 'n8n', icon: SiN8N, color: 'text-red-500' },
  { name: 'Python', icon: SiPython, color: 'text-yellow-300' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: 'text-blue-400' },
  { name: 'Azure', icon: VscAzure, color: 'text-blue-500' },
  { name: 'React', icon: FaReact, color: 'text-cyan-400' },
  { name: 'JavaScript', icon: SiJavascript, color: 'text-yellow-400' },
  { name: 'Next.js', icon: SiNextdotjs, color: 'text-white' },
  { name: 'Node.js', icon: FaNodeJs, color: 'text-green-500' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'text-cyan-300' },
]

import { useTranslations } from 'next-intl';

export function TechStackCarousel() {
  const t = useTranslations('techStack');
  const renderStack = (stack: Stack, index: number, prefix: string) => (
    <div key={`${prefix}-${index}`} className="flex flex-col items-center mx-8 min-w-[80px] group transition-all duration-300 hover:scale-110 cursor-pointer">
      <div className="h-12 md:h-16 flex items-center justify-center mb-3">
        {stack.isImage ? (
          <div className="relative w-10 h-10 md:w-12 md:h-12 drop-shadow-lg filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
            <Image 
              src={stack.icon as string} 
              alt={stack.name}
              fill
              className="object-contain"
            />
          </div>
        ) : (
          <stack.icon className={`text-4xl md:text-5xl ${stack.color} drop-shadow-lg filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500`} />
        )}
      </div>
      <span className="text-zinc-500 text-xs md:text-sm font-medium group-hover:text-white transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300">
        {stack.name}
      </span>
    </div>
  )

  return (
    <section className="bg-zinc-950 py-12 overflow-hidden relative border-y border-zinc-800/50">
      
      <div className="max-w-6xl mx-auto mb-8 px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-zinc-200 to-zinc-500">
          {t('title')}
        </h2>
      </div>
      <div className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-zinc-950 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-24 bg-linear-to-l from-zinc-950 to-transparent z-10 pointer-events-none"></div>
      
      <div className="flex w-full overflow-hidden pause-on-hover py-4 mask-gradient">
        {/* Container with duplicated items for infinite scroll */}
        <div className="flex animate-scroll whitespace-nowrap items-center"> 
           {/* Original List */}
          {stacks.map((stack, index) => renderStack(stack, index, 'original'))}
          {/* Duplicate List 1 */}
          {stacks.map((stack, index) => renderStack(stack, index, 'duplicate-1'))}
          {/* Duplicate List 2 */}
          {stacks.map((stack, index) => renderStack(stack, index, 'duplicate-2'))}
        </div>
      </div>
    </section>
  )
}
