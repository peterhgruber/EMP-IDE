// import VueI18n from 'vue-i18n'
// // Vue.use(VueI18n)


// // 以下为语言包单独设置的场景，单独设置时语言包需单独引入
// const messages = {
//   'zh-CN': require('./lang/zh'),   // 中文语言包
//   'en-US': require('./lang/en')    // 英文语言包
// }

// // 最后 export default，这一步肯定要写的。
// export default new VueI18n({
//   locale: 'en-US', // set locale 默认显示英文
//   messages // set locale messages
// })


import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const DEFAULT_LANG = 'zh-CN'
const LOCALE_KEY = 'localeLanguage'

const locales = {
  'zh-CN': require('./lang/zh'),   // 中文语言包
  'en-US': require('./lang/en')    // 英文语言包
}

const i18n = new VueI18n({
  locale: DEFAULT_LANG,
  messages: locales,
})

export const setup = lang => {
  if (lang === undefined) {
    lang = window.localStorage.getItem(LOCALE_KEY)
    if (locales[lang] === undefined) {
      lang = DEFAULT_LANG
    }
  }
  window.localStorage.setItem(LOCALE_KEY, lang)

  Object.keys(locales).forEach(lang => {
    document.body.classList.remove(`lang-${lang}`)
  })
  document.body.classList.add(`lang-${lang}`)
  document.body.setAttribute('lang', lang)

  Vue.config.lang = lang
  i18n.locale = lang
}

// setup()
export default i18n