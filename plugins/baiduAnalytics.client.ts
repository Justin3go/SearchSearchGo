export default defineNuxtPlugin((nuxtApp) => {
  const hm = document.createElement('script')
  hm.src = 'https://hm.baidu.com/hm.js?23c119ec9e022dea0c801bd6887b4221'
  const s = document.getElementsByTagName('html')[0]
  s.appendChild(hm)
})
