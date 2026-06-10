/**
 * 生成静音音频流（WebRTC 等场景）
 * @param audioContext 可选，复用已有 AudioContext；不传则自动创建
 * @param gain 增益值，默认 0.0001（接近静音）
 * @example const { stream } = createMutedAudioStream()
 * @example const { stream, destroy } = createMutedAudioStream(ctx)
 * @example pc.addTrack(createMutedAudioStream().stream.getAudioTracks()[0])
 * @returns stream 静音 MediaStream；destroy 用于释放振荡器资源
 */
export const createMutedAudioStream = (audioContext?: AudioContext, gain = 0.0001) => {
  if (!audioContext) {
    const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    audioContext = new Ctor()
  }
  const oscillator = audioContext.createOscillator()
  oscillator.type = 'sine'
  oscillator.frequency.setValueAtTime(1, audioContext.currentTime)
  const gainNode = audioContext.createGain()
  gainNode.gain.setValueAtTime(gain, audioContext.currentTime)
  oscillator.connect(gainNode)
  const mediaDest = audioContext.createMediaStreamDestination()
  gainNode.connect(mediaDest)
  oscillator.start(audioContext.currentTime)
  const destroy = () => {
    try {
      oscillator.stop()
      oscillator.disconnect()
      gainNode.disconnect()
    } catch {
      /* 已停止 */
    }
  }
  return { stream: mediaDest.stream, destroy }
}

/**
 * 生成假视频流（彩色渐变画布，用于测试或占位）
 * @param options 视频流配置
 * @param options.width 画布宽度（像素），默认 32
 * @param options.height 画布高度（像素），默认 32
 * @param options.opacity 颜色与文字不透明度 0~1，默认 1
 * @param options.fps 帧率，最大 30，默认 20
 * @param options.text 画布居中文字，默认空；文字较长时需增大宽高
 * @example createFakeVideoStream({ width: 640, height: 480, fps: 20 })
 * @example createFakeVideoStream({ width: 32, height: 32, text: 'REC' })
 * @returns MediaStream
 */
export const createFakeVideoStream = ({ width = 32, height = 32, opacity = 1, fps = 20, text = '' }: { width?: number; height?: number; opacity?: number; fps?: number; text?: string } = {}) => {
  fps = Math.min(fps, 30)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!
  canvas.width = width
  canvas.height = height

  let hue = 0 // 颜色变化控制

  // 捕获画布流
  const stream = canvas.captureStream(fps)

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height) // 清除画布

    // 绘制渐变背景
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, `hsla(${hue}, 100%, 50%, ${opacity})`)
    gradient.addColorStop(1, `hsla(${hue + 120}, 100%, 50%, ${opacity})`)

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // 绘制居中文本（如果提供了文本）
    if (text) {
      const fontSize = Math.min(width, height) * 0.8 // 动态字体大小
      ctx.font = `bold ${fontSize / text.length}px Arial`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})` // 白色文本

      ctx.fillText(text, canvas.width * 0.5, canvas.height * 0.5)
    }

    hue = (hue + 1) % 360 // 更新颜色值

    // 继续绘制动画（如果流仍活跃）
    if (stream.active) {
      setTimeout(draw, Math.round(1000 / fps))
    }
  }

  draw()
  return stream
}
