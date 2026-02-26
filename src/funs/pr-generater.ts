/**
 * 生成静音音频轨道（无声音）
 * @param audioContext
 * @returns MediaStream
 */
export const createMutedAudioStream = (audioContext?: AudioContext) => {
  if (!audioContext) {
    // @ts-ignore 音频上下文
    audioContext = AudioContext = new (window.AudioContext || window.webkitAudioContext)()
  }
  const oscillator = audioContext.createOscillator()
  oscillator.type = 'sine'
  oscillator.frequency.setValueAtTime(0, audioContext.currentTime) // 零频率

  // 创建增益节点（强制静音）
  const gainNode = audioContext.createGain()
  gainNode.gain.value = 0 // 静音设置

  // 连接音频源 → 增益节点 → 输出
  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)

  // 启动音频源
  oscillator.start()

  // 创建媒体流目的地
  const mediaDest = audioContext.createMediaStreamDestination()

  // 将音频链路接入媒体流
  gainNode.disconnect() // 断开原有连接
  oscillator.connect(mediaDest)

  return mediaDest.stream
}

/**
 * 生成视频流
 * @param width width = 32
 * @param height height = 32
 * @param opacity opacity = 0
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
