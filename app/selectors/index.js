import { createSelector } from 'reselect'

const getProducts = ()
export const searchProducts = createSelector(
  [getProducts, getPlaceItems],
  (activePlaceUuid, placeItems) => {
    let placeDetails
    try {
      placeDetails = placeItems[activePlaceUuid].details
    } catch (e) {
      placeDetails = null
    }
    return placeDetails
  },
)
