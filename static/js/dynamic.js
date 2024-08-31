function computeRippleStyles(element, event) {
  const { top, left } = element.getBoundingClientRect()
  const { clientWidth, clientHeight } = element
  
  const radius = Math.sqrt(clientWidth ** 2 + clientHeight ** 2) / 2
  const size = radius * 2
  
  const localX = event.clientX - left
  const localY = event.clientY - top

  const centerX = (clientWidth - radius * 2) / 2
  const centerY = (clientHeight - radius * 2) / 2

  const x = localX - radius
  const y = localY - radius

  return { x, y, centerX, centerY, size }
}


function createRipple(event) {
  const container = this
  const { x, y, centerX, centerY, size } = computeRippleStyles(container, event)
  const ripple = document.createElement('div')
  ripple.classList.add('my-ripple')
  ripple.style.opacity = `0`
  ripple.style.transform = `translate(${x}px, ${y}px) scale3d(.3, .3, .3)`
  ripple.style.width = `${size}px`
  ripple.style.height = `${size}px`
  // 记录水波的创建时间
  ripple.dataset.createdAt = String(performance.now())

  const { position } = window.getComputedStyle(container)
  container.style.overflow = 'hidden'
  position === 'static' && (this.style.position = 'relative')

  container.appendChild(ripple)

  window.setTimeout(() => {
    ripple.style.transform = `translate(${centerX}px, ${centerY}px) scale3d(1, 1, 1)`
    ripple.style.opacity = `.25`
  })
}


function removeRipple() {
  const container = this
  const ripples = container.querySelectorAll('.my-ripple')
  if (!ripples.length) {
    return
  }

  const lastRipple = ripples[ripples.length - 1]
  //通过水波的创建时间计算出扩散动画还需要执行多久，确保每一个水波都完整的执行了扩散动画
  const delay = 300 - performance.now() + Number(lastRipple.dataset.createdAt)

  setTimeout(() => {
    lastRipple.style.opacity = `0`
    
    setTimeout(() => lastRipple.parentNode?.removeChild(lastRipple), 300)
  }, delay)
}

const VRipple = {
  mounted(el) {
    el.addEventListener('mousedown', createRipple)
    document.addEventListener('mouseup', removeRipple)
  },
  unmounted(el) {
    el.removeEventListener('mousedown', createRipple)
    document.removeEventListener('mouseup', removeRipple)
  }
}