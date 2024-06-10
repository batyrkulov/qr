export interface ILocationState {
  selectedArea: string | null
  selectedDistrict: string | null
}

export enum LocationActionsTypes {
  SET_SELECTED_AREA = "SET_SELECTED_AREA",
  SET_SELECTED_DISTRICT = "SET_SELECTED_DISTRICT",
  CLEAR_LOCATIONS = "CLEAR_LOCATIONS",
}
