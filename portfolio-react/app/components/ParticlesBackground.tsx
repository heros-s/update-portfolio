'use client'
import { useRef, useEffect } from 'react'

export function ParticlesBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const PARTICLE_COUNT = 80
    const MAX_DISTANCE = 120

    const particles: {
        x: number
        y: number
        vx: number
        vy: number
        radius: number
    }[] = []

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const NAVBAR_HEIGHT = 80
        particles.push({
        x: Math.random() * canvas.width,
        y: NAVBAR_HEIGHT + Math.random() * (canvas.height - NAVBAR_HEIGHT),
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 1.5 + 1
        })
    }

    let animationId: number
    let isVisible = true

    const observer = new IntersectionObserver(
        ([entry]) => { isVisible = entry.isIntersecting },
        { threshold: 0 }
    )
    observer.observe(canvas)

    function animate() {
        if (!isVisible) {
            animationId = requestAnimationFrame(animate)
            return // pula o desenho mas mantém o loop pronto
        }
        ctx!.clearRect(0, 0, canvas!.width, canvas!.height)

      // linhas de conexão
        particles.forEach((p1, i) => {
            particles.forEach((p2, j) => {
                if (j <= i) return

                const dx = p1.x - p2.x
                const dy = p1.y - p2.y
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < MAX_DISTANCE) {
                    const opacity = 1 - (distance / MAX_DISTANCE)
                    ctx!.beginPath()
                    ctx!.moveTo(p1.x, p1.y)
                    ctx!.lineTo(p2.x, p2.y)
                    ctx!.strokeStyle = `rgba(6, 182, 212, ${opacity * 0.15})`
                    ctx!.lineWidth = 0.8
                    ctx!.stroke()
                }
            })
        })

      // pontos
        particles.forEach(p => {
            p.x += p.vx
            p.y += p.vy

            if (p.x < 0 || p.x > canvas!.width) p.vx *= -1
            if (p.y < 0 || p.y > canvas!.height) p.vy *= -1

            ctx!.shadowBlur = 8
            ctx!.shadowColor = 'rgba(6, 182, 212, 0.8)'
            ctx!.beginPath()
            ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
            ctx!.fillStyle = 'rgba(6, 182, 212, 0.6)'
            ctx!.fill()
            ctx!.shadowBlur = 0
        })

        animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
        cancelAnimationFrame(animationId)
    observer.disconnect()
    }
    }, 
    [])

    return (
    <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: 'none' }}
    />
    )
}