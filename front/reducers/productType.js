import produce from "immer";

export const initailState = {
  types: [],
  createModal: false,
  //
  st_typeLoading: false,
  st_typeDone: false,
  st_typeError: null,
  //
  st_typeCreateLoading: false,
  st_typeCreateDone: false,
  st_typeCreateError: null,
};

export const PRODUCT_TYPE_REQUEST = "PRODUCT_TYPE_REQUEST";
export const PRODUCT_TYPE_SUCCESS = "PRODUCT_TYPE_SUCCESS";
export const PRODUCT_TYPE_FAILURE = "PRODUCT_TYPE_FAILURE";

export const PRODUCT_TYPE_CREATE_REQUEST = "PRODUCT_TYPE_CREATE_REQUEST";
export const PRODUCT_TYPE_CREATE_SUCCESS = "PRODUCT_TYPE_CREATE_SUCCESS";
export const PRODUCT_TYPE_CREATE_FAILURE = "PRODUCT_TYPE_CREATE_FAILURE";

export const CREATE_MODAL_TOGGLE = "CREATE_MODAL_TOGGLE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case PRODUCT_TYPE_REQUEST:
        draft.st_typeLoading = true;
        draft.st_typeDone = false;
        draft.st_typeError = null;
        break;

      case PRODUCT_TYPE_SUCCESS:
        draft.st_typeLoading = false;
        draft.st_typeDone = true;
        draft.st_typeError = null;
        draft.types = action.data;
        break;

      case PRODUCT_TYPE_FAILURE:
        draft.st_typeLoading = false;
        draft.st_typeDone = false;
        draft.st_typeError = action.data;
        break;

      ////////

      case PRODUCT_TYPE_CREATE_REQUEST:
        draft.st_typeCreateLoading = true;
        draft.st_typeCreateDone = false;
        draft.st_typeCreateError = null;
        break;

      case PRODUCT_TYPE_CREATE_SUCCESS:
        draft.st_typeCreateLoading = false;
        draft.st_typeCreateDone = true;
        draft.st_typeCreateError = null;
        draft.createModal = !draft.createModal;
        break;

      case PRODUCT_TYPE_CREATE_FAILURE:
        draft.st_typeCreateLoading = false;
        draft.st_typeCreateDone = false;
        draft.st_typeCreateError = action.data;
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
