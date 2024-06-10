import { IMenuItem } from "../components"
import { Countries, CountriesAr } from "./countries"

const cars: { [key in Countries]: IMenuItem[] } = {
  British: [],
  American: [],
  German: [],
  Japanese: [
    { short_name: "Nissan", icon: "nissan" },
    { short_name: "Lexus", icon: "lexus" },
    { short_name: "Toyota", icon: "toyota" },
    { short_name: "Honda", icon: "honda" },
  ],
  Italian: [],
  Korean: [],
  French: [],
  Swedish: [],
}
export const carsAr: { [key in CountriesAr]: IMenuItem[] } = {
  [CountriesAr.Japanese]: [
    { short_name: "Nissan", icon: "nissan" },
    { short_name: "Lexus", icon: "lexus" },
    { short_name: "Toyota", icon: "toyota" },
    { short_name: "Honda", icon: "honda" },
  ],
  [CountriesAr.American]: [],
  [CountriesAr.Swedish]: [],
  [CountriesAr.Korean]: [],
  [CountriesAr.Italian]: [],
  [CountriesAr.German]: [],
  [CountriesAr.French]: [],
  [CountriesAr.British]: [],
}

export default cars
