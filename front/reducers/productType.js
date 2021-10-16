import produce from "immer";

export const initailState = {
  types: [],
  //
  st_typeLoading: false,
  st_typeDone: false,
  st_typeError: null,
};

export const PRODUCT_TYPE_REQUEST = "PRODUCT_TYPE_REQUEST";
export const PRODUCT_TYPE_SUCCESS = "PRODUCT_TYPE_SUCCESS";
export const PRODUCT_TYPE_FAILURE = "PRODUCT_TYPE_FAILURE";

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

      default:
        break;
    }
  });

export default reducer;
