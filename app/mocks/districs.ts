import { I18nManager } from "react-native"

enum DistricsEN {
  Ahmadi = "Ahmadi district",
  Jahra = "Jahra district",
  Kuwait = "Kuwait city district",
  Muraber = "Muraber Al-Kabeer district",
  Farwaniyah = "Farwaniyah district",
  Hawalli = "Hawalli district",
}
enum DistricsAR {
  Ahmadi = "ﻣﺤﺎﻓﻈﺔ اﻟﺄﺣﻤﺪي",
  Jahra = "ﻣﺤﺎﻓﻈﺔ اﻟﺠﻬﺮاء",
  Kuwait = "ﻣﺤﺎﻓﻈﺔ اﻟﻌﺎﺻﻤﺔ",
  Muraber = "ﻣﺤﺎﻓﻈﺔ ﻣﺒﺎرك اﻟﻜﺒﻴﺮ",
  Farwaniyah = "ﻣﺤﺎﻓﻈﺔ اﻟﻔﺮواﻧﻴﺔ",
  Hawalli = "ﻣﺤﺎﻓﻈﺔ ﺣﻮﻟﻲ",
}

const getDistrict = (name: string) => {
  return I18nManager.isRTL ? DistricsAR[name] : DistricsEN[name]
}

const districs = [
  {
    label: getDistrict('Ahmadi'),
    value: getDistrict('Ahmadi'),
  },
  {
    label: getDistrict('Jahra'),
    value: getDistrict('Jahra'),
  },
  {
    label: getDistrict('Kuwait'),
    value: getDistrict('Kuwait'),
  },
  {
    label: getDistrict('Muraber'),
    value: getDistrict('Muraber'),
  },
  {
    label: getDistrict('Farwaniyah'),
    value: getDistrict('Farwaniyah'),
  },
  {
    label: getDistrict('Hawalli'),
    value: getDistrict('Hawalli'),
  },
]

export default districs
