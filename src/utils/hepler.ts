declare global {
  interface Window {
    lastStream?: MediaStream
    stopLastStream?: () => void
  }
}

window.stopLastStream = function () {
  if (window.lastStream && typeof window.lastStream.getTracks === 'function') {
    window.lastStream.getTracks().forEach((track) => {
      track.stop()
    })
    console.log('✅ Microphone stream has been stopped.')
  } else {
    console.warn('⚠️ No valid stream found to stop.')
  }
}
