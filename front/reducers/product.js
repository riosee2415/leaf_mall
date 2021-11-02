import produce from "immer";

export const initailState = {
  products: [],
  //
  st_productListLoading: false,
  st_productListDone: false,
  st_productListError: null,
  //
  st_productTopToggleLoading: false,
  st_productTopToggleDone: false,
  st_productTopToggleError: null,
};

export const PRODUCT_LIST_REQUEST = "PRODUCT_LIST_REQUEST";
export const PRODUCT_LIST_SUCCESS = "PRODUCT_LIST_SUCCESS";
export const PRODUCT_LIST_FAILURE = "PRODUCT_LIST_FAILURE";

export const PRODUCT_TOP_TOGGLE_REQUEST = "PRODUCT_TOP_TOGGLE_REQUEST";
export const PRODUCT_TOP_TOGGLE_SUCCESS = "PRODUCT_TOP_TOGGLE_SUCCESS";
export const PRODUCT_TOP_TOGGLE_FAILURE = "PRODUCT_TOP_TOGGLE_FAILURE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case PRODUCT_LIST_REQUEST:
        draft.st_productListLoading = true;
        draft.st_productListDone = false;
        draft.st_productListError = null;
        break;

      case PRODUCT_LIST_SUCCESS:
        draft.st_productListLoading = false;
        draft.st_productListDone = true;
        draft.st_productListError = null;
        draft.products = action.data;
        break;

      case PRODUCT_LIST_FAILURE:
        draft.st_productListLoading = false;
        draft.st_productListDone = false;
        draft.st_productListError = action.data;
        break;

      ////////

      case PRODUCT_TOP_TOGGLE_REQUEST:
        draft.st_productTopToggleLoading = true;
        draft.st_productTopToggleDone = false;
        draft.st_productTopToggleError = null;
        break;

      case PRODUCT_TOP_TOGGLE_SUCCESS:
        draft.st_productTopToggleLoading = false;
        draft.st_productTopToggleDone = true;
        draft.st_productTopToggleError = null;
        break;

      case PRODUCT_TOP_TOGGLE_FAILURE:
        draft.st_productTopToggleLoading = false;
        draft.st_productTopToggleDone = false;
        draft.st_productTopToggleError = action.data;
        break;

      ////////

      default:
        break;
    }
  });

export default reducer;
