import { I18nManager } from "react-native"

import { IMenuItem } from "../components/menu-item"

export enum Countries {
  British = "British",
  American = "American",
  German = "German",
  Japanese = "Japanese",
  Italian = "Italian",
  Korean = "Korean",
  French = "French",
  Swedish = "Swedish",
}
export enum CountriesAr {
  British = "بريطانية",
  American = "امريكية",
  German = "المانية",
  Japanese = "يابانية",
  Italian = "ايطالية",
  Korean = "كورية",
  French = "فرنسية",
  Swedish = "سويدية",
}

const countries: IMenuItem[] = [
  {
    name: I18nManager.isRTL ? CountriesAr.British : Countries.British,
    icon: "uk",
  },
  {
    name: I18nManager.isRTL ? CountriesAr.American : Countries.American,
    icon: "usa",
  },
  {
    name: I18nManager.isRTL ? CountriesAr.German : Countries.German,
    icon: "germ",
  },
  {
    name: I18nManager.isRTL ? CountriesAr.Japanese : Countries.Japanese,
    icon: "jp",
  },
  {
    name: I18nManager.isRTL ? CountriesAr.Italian : Countries.Italian,
    icon: "ita",
  },
  {
    name: I18nManager.isRTL ? CountriesAr.Korean : Countries.Korean,
    icon: "kr",
  },
  {
    name: I18nManager.isRTL ? CountriesAr.French : Countries.French,
    icon: "fr",
  },
  {
    name: I18nManager.isRTL ? CountriesAr.Swedish : Countries.Swedish,
    icon: "swe",
  },
]

export default countries
