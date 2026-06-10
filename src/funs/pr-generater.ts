/**
 * 生成静音音频流（WebRTC 等场景）
 * @example const { stream } = createMutedAudioStream()
 * @example const { stream, destroy } = createMutedAudioStream(ctx)
 * @example pc.addTrack(createMutedAudioStream().stream.getAudioTracks()[0])
 * @returns { stream, destroy }
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
 * 生成视频流
 * @param width width = 32
 * @param height height = 32
 * @param opacity opacity = 1
 * @param fps fps = 20
 * @param text text = '' 文本内容 如果看不清需要宽高设置大一点
 * @returns MediaStream
 */
// 生成视频流
export const createFakeVideoStream = ({ width = 32, height = 32, opacity = 1, fps = 20, text = '' }: { width: number; height: number; opacity: number; fps: number; text?: string }) => {
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
