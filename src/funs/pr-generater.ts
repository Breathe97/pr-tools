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
 * @param width width = 10
 * @param height height = 10
 * @param opacity opacity = 0
 * @param fps fps = 30
 * @returns MediaStream
 */
export const createFakeVideoStream = (width = 10, height = 10, opacity = 0, fps = 30) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!
  canvas.width = width
  canvas.height = height

  let hue = 0 // 用于控制颜色的变化

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height) // 清除画布

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, `hsla(${hue}, 100%, 50%, ${opacity})`) // 渐变开始颜色
    gradient.addColorStop(1, `hsla(${hue + 120}, 100%, 50%, ${opacity})`) // 渐变结束颜色

    ctx.fillStyle = gradient // 设置填充样式为渐变
    ctx.fillRect(0, 0, canvas.width, canvas.height) // 填充矩形，即整个画布

    hue = (hue + 1) % 360 // 更新颜色值，实现动画效果
  }

  setInterval(draw, 100)

  // 捕获画布流
  const stream = canvas.captureStream(fps)

  return stream
}
