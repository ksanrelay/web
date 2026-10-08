import type { Engine, ISourceOptions } from '@tsparticles/engine'
import { Particles, ParticlesProvider } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { useMemo } from 'react'

// Must be referentially stable for ParticlesProvider.
async function initEngine(engine: Engine) {
  await loadSlim(engine)
}

interface Profile {
  count: number
  links: boolean
  move: boolean
  hover: boolean
}

/** Particle budget scaled to the device: fewer on small/low-power screens, static under reduced motion. */
function deviceProfile(): Profile {
  const media = (q: string) => window.matchMedia(q).matches
  const reducedMotion = media('(prefers-reduced-motion: reduce)')
  const small = media('(max-width: 720px)')
  const lowPower = (navigator.hardwareConcurrency ?? 8) <= 4
  return {
    count: small ? 28 : lowPower ? 40 : 70,
    links: !small || !lowPower,
    move: !reducedMotion,
    hover: !reducedMotion && media('(hover: hover)'),
  }
}

function buildOptions(p: Profile): ISourceOptions {
  return {
    fullScreen: { enable: false },
    background: { color: { value: 'transparent' } },
    detectRetina: true,
    fpsLimit: 60,
    pauseOnBlur: true,
    pauseOnOutsideViewport: true,
    particles: {
      number: { value: p.count, density: { enable: true, width: 1600, height: 900 } },
      paint: { color: { value: '#ffffff' }, fill: { enable: true } },
      shape: { type: 'circle' },
      opacity: { value: { min: 0.12, max: 0.45 } },
      size: { value: { min: 0.6, max: 1.6 } },
      move: {
        enable: p.move,
        speed: 0.18,
        direction: 'none',
        random: true,
        straight: false,
        outModes: { default: 'out' },
      },
      links: {
        enable: p.links,
        color: '#ffffff',
        distance: 150,
        opacity: 0.07,
        width: 1,
      },
    },
    interactivity: {
      detectsOn: 'window',
      events: {
        onHover: { enable: p.hover, mode: 'grab' },
        onClick: { enable: false },
      },
      modes: {
        grab: { distance: 170, links: { opacity: 0.22 } },
      },
    },
  }
}

/** Fixed, pointer-transparent particle layer behind all content. */
export default function ParticleBackground() {
  const options = useMemo(() => buildOptions(deviceProfile()), [])
  return (
    <ParticlesProvider init={initEngine}>
      <Particles id="particles" className="particles" options={options} />
    </ParticlesProvider>
  )
}
