import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import { I18nManager } from "react-native"

import ar from "../../locales/ar.json"
import en from "../../locales/en.json"

// eslint-disable-next-line @typescript-eslint/no-floating-promises

i18n.use(initReactI18next).init({
  lng: I18nManager.isRTL ? "ar" : "en",
  fallbackLng: "en",
  debug: true,

  resources: {
    en: {
      translation: en,
    },
    ar: {
      translation: ar,
    },
  },

  interpolation: {
    escapeValue: false,
  },
})

export default i18n
