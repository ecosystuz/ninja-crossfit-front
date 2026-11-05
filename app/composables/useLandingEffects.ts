export const useLandingEffects = () => {
  let observer: IntersectionObserver | undefined
  let mutationObserver: MutationObserver | undefined
  let revealScanFrame: number | undefined
  let onScroll: (() => void) | undefined
  let onPointerMove: ((event: PointerEvent) => void) | undefined
  let onPointerLeave: (() => void) | undefined

  const registerRevealElements = () => {
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>('.reveal:not(.in-view)'))

    if (!observer) {
      revealElements.forEach(element => element.classList.add('in-view'))
      return
    }

    revealElements.forEach(element => observer?.observe(element))
  }

  const scheduleRevealScan = () => {
    if (revealScanFrame !== undefined) cancelAnimationFrame(revealScanFrame)
    revealScanFrame = requestAnimationFrame(() => {
      registerRevealElements()
      revealScanFrame = undefined
    })
  }

  onMounted(() => {
    const header = document.querySelector<HTMLElement>('#siteHeader')
    const progress = document.querySelector<HTMLElement>('#scrollProgress')
    const glow = document.querySelector<HTMLElement>('#cursorGlow')

    let ticking = false
    const updateScroll = () => {
      const top = window.scrollY
      header?.classList.toggle('scrolled', top > 30)
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      if (progress) progress.style.width = `${Math.min(100, (top / max) * 100)}%`
      ticking = false
    }
    onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(updateScroll)
      }
    }

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            observer?.unobserve(entry.target)
          }
        })
      }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' })
    }
    registerRevealElements()

    mutationObserver = new MutationObserver(scheduleRevealScan)
    mutationObserver.observe(document.querySelector('#__nuxt') ?? document.body, {
      childList: true,
      subtree: true
    })

    const finePointer = window.matchMedia('(pointer:fine) and (prefers-reduced-motion:no-preference)')
    onPointerMove = (event: PointerEvent) => {
      if (!glow) return
      glow.style.left = `${event.clientX}px`
      glow.style.top = `${event.clientY}px`
      glow.style.opacity = '1'
    }
    onPointerLeave = () => {
      if (glow) glow.style.opacity = '0'
    }
    if (finePointer.matches) {
      document.addEventListener('pointermove', onPointerMove, { passive: true })
      document.addEventListener('pointerleave', onPointerLeave)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    updateScroll()
  })

  onBeforeUnmount(() => {
    if (onScroll) window.removeEventListener('scroll', onScroll)
    if (onPointerMove) document.removeEventListener('pointermove', onPointerMove)
    if (onPointerLeave) document.removeEventListener('pointerleave', onPointerLeave)
    if (revealScanFrame !== undefined) cancelAnimationFrame(revealScanFrame)
    mutationObserver?.disconnect()
    observer?.disconnect()
  })
}
