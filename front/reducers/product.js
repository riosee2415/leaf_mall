import produce from "immer";

export const initailState = {
  products: [],
  createModal: false,
  previewTh: null,
  //
  st_productListLoading: false,
  st_productListDone: false,
  st_productListError: null,
  //
  st_productTopToggleLoading: false,
  st_productTopToggleDone: false,
  st_productTopToggleError: null,
  //
  st_productThumbnailLoading: false,
  st_productThumbnailDone: false,
  st_productThumbnailError: null,
};

export const PRODUCT_LIST_REQUEST = "PRODUCT_LIST_REQUEST";
export const PRODUCT_LIST_SUCCESS = "PRODUCT_LIST_SUCCESS";
export const PRODUCT_LIST_FAILURE = "PRODUCT_LIST_FAILURE";

export const PRODUCT_TOP_TOGGLE_REQUEST = "PRODUCT_TOP_TOGGLE_REQUEST";
export const PRODUCT_TOP_TOGGLE_SUCCESS = "PRODUCT_TOP_TOGGLE_SUCCESS";
export const PRODUCT_TOP_TOGGLE_FAILURE = "PRODUCT_TOP_TOGGLE_FAILURE";

export const PRODUCT_THUMBNAIL_REQUEST = "PRODUCT_THUMBNAIL_REQUEST";
export const PRODUCT_THUMBNAIL_SUCCESS = "PRODUCT_THUMBNAIL_SUCCESS";
export const PRODUCT_THUMBNAIL_FAILURE = "PRODUCT_THUMBNAIL_FAILURE";

export const CREATE_MODAL_TOGGLE = "CREATE_MODAL_TOGGLE";

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

      case PRODUCT_THUMBNAIL_REQUEST:
        draft.st_productThumbnailLoading = true;
        draft.st_productThumbnailDone = false;
        draft.st_productThumbnailError = null;
        break;

      case PRODUCT_THUMBNAIL_SUCCESS:
        draft.st_productThumbnailLoading = false;
        draft.st_productThumbnailDone = true;
        draft.st_productThumbnailError = null;
        draft.previewTh = action.data.path;
        break;

      case PRODUCT_THUMBNAIL_FAILURE:
        draft.st_productThumbnailLoading = false;
        draft.st_productThumbnailDone = false;
        draft.st_productThumbnailError = action.data;
        break;

      ////////

      case CREATE_MODAL_TOGGLE:
        draft.createModal = !draft.createModal;
        break;

      default:
        break;
    }
  });

export default reducer;
