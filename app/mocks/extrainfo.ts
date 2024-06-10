import { I18nManager } from "react-native"

enum bodyTypeEN {
  Classic = "Classic",
  Suv = "Suv",
  Pickup = "Pickup",
  Sport = "Sport",
  Caravan = "Caravan",
  Minivan = "Minivan",
  Upgraded = "Upgraded",
  Economy = "Economy",
  Sedan = "Sedan",
}
enum bodyTypeAR {
  Classic = "كيسالك",
  Suv = "يف وي سا",
  Pickup = "تيناو",
  Sport = "تروبس",
  Caravan = "نافرك",
  Minivan = "ناف ينيم",
  Upgraded = "موغلم",
  Economy = "ةيداصتقا",
  Sedan = "نولاص",
}

const getBodyType = (name: string) => {
  return I18nManager.isRTL ? bodyTypeAR[name] : bodyTypeEN[name]
}

export const bodyType = [
  {
    label: getBodyType("Classic"),
    value: getBodyType("Classic"),
  },
  {
    label: getBodyType("Suv"),
    value: getBodyType("Suv"),
  },
  {
    label: getBodyType("Pickup"),
    value: getBodyType("Pickup"),
  },
  {
    label: getBodyType("Sport"),
    value: getBodyType("Sport"),
  },
  {
    label: getBodyType("Caravan"),
    value: getBodyType("Caravan"),
  },
  {
    label: getBodyType("Minivan"),
    value: getBodyType("Minivan"),
  },
  {
    label: getBodyType("Upgraded"),
    value: getBodyType("Upgraded"),
  },
]

const getColorExterior = (name: string) => {
  return I18nManager.isRTL ? colorExteriorAR[name] : colorExteriorEN[name]
}

enum colorExteriorEN {
  White = "White",
  Black = "Black",
  Red = "Red",
  Blue = "Blue",
  Silver = "Silver",
  Maroon = "Maroon",
  SkyBlue = "Sky blue",
  DarkBlue = "Dark blue",
  Yellow = "Yellow",
  Green = "Green",
  Golden = "Golden",
  Orange = "Orange",
  Purple = "Purple",
  DarkViolet = "Dark Violet",
  Bronze = "Bronze",
  Brown = "Brown",
  Turquoise = "Turquoise",
  Biege = "Biege",
  Olive = "Olive",
}
enum colorExteriorAR {
  White = "White",
  Black = "Black",
  Red = "Red",
  Blue = "Blue",
  Silver = "Silver",
  Maroon = "Maroon",
  SkyBlue = "Sky blue",
  DarkBlue = "Dark blue",
  Yellow = "Yellow",
  Green = "Green",
  Golden = "Golden",
  Orange = "Orange",
  Purple = "Purple",
  DarkViolet = "Dark Violet",
  Bronze = "Bronze",
  Brown = "Brown",
  Turquoise = "Turquoise",
  Biege = "Biege",
  Olive = "Olive",
}

const generateColorsExterior = () =>
  Object.keys(colorExteriorEN).map((key) => ({
    label: getColorExterior(key),
    value: getColorExterior(key),
  }))

export const colorsExterior = generateColorsExterior()

const getColorInterior = (name: string) => {
  return I18nManager.isRTL ? colorInteriorAR[name] : colorInteriorEN[name]
}

enum colorInteriorEN {
  Beige = "Beige",
  Black = "Black",
  White = "White",
  Tan = "Tan",
  Gray = "Gray",
  Maroon = "Maroon",
  Silver = "Silver",
}
enum colorInteriorAR {
  Beige = "Beige",
  Black = "Black",
  White = "White",
  Tan = "Tan",
  Gray = "Gray",
  Maroon = "Maroon",
  Silver = "Silver",
}

const generateColorsInterior = () =>
  Object.keys(colorInteriorEN).map((key) => ({
    label: getColorInterior(key),
    value: getColorInterior(key),
  }))

export const colorsInterior = generateColorsInterior()

const getImport = (name: string) => {
  return I18nManager.isRTL ? importAR[name] : importEN[name]
}

enum importEN {
  Gulf = "Gulf",
  Kuwait = "Kuwait",
  Germany = "Germany",
  USA = "USA",
  Japan = "Japan",
}
enum importAR {
  Gulf = "Gulf",
  Kuwait = "Kuwait",
  Germany = "Germany",
  USA = "USA",
  Japan = "Japan",
}

const generateImport = () =>
  Object.keys(importEN).map((key) => ({
    label: getImport(key),
    value: getImport(key),
  }))

export const imports = generateImport()
