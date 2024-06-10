import { IOptionWithTranslation } from "../store/ducks/meta/types"

export const getOptionName = (
  id: number | string,
  translations: IOptionWithTranslation[],
) => {
  return translations.find((t) => t.id === id)?.item_description.name
}