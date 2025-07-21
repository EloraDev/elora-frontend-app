import { registerSW } from 'virtual:pwa-register'

export function registerPWA() {
  const updateSW = registerSW({
    onNeedRefresh() {
      // Show a prompt to user to reload the page
      if (confirm('New content available. Reload?')) {
        updateSW(true)
      }
    },
    onOfflineReady() {
      console.log('App ready to work offline')
    },
  })
}