export default function platformOs() {
  const userAgent = window.navigator.userAgent
  const platform = window.navigator.platform

  if (/Android/.test(userAgent)) return 'android'
  if (/iPhone|iPad|iPod/.test(userAgent)) return 'ios'
  if (/Mac/.test(platform)) return 'macos'
  if (/Win/.test(platform)) return 'windows'
  if (/Linux/.test(platform)) return 'linux'

  return 'unknown'
}
