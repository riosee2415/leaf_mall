import produce from "immer";

export const initailState = {
  types: [],
  createModal: false,
  updateModal: false,
  //
  st_typeLoading: false,
  st_typeDone: false,
  st_typeError: null,
  //
  st_typeCreateLoading: false,
  st_typeCreateDone: false,
  st_typeCreateError: null,
  //
  st_typeDeleteLoading: false,
  st_typeDeleteDone: false,
  st_typeDeleteError: null,
  //
  st_typeUpdateLoading: false,
  st_typeUpdateDone: false,
  st_typeUpdateError: null,
};

export const PRODUCT_TYPE_REQUEST = "PRODUCT_TYPE_REQUEST";
export const PRODUCT_TYPE_SUCCESS = "PRODUCT_TYPE_SUCCESS";
export const PRODUCT_TYPE_FAILURE = "PRODUCT_TYPE_FAILURE";

export const PRODUCT_TYPE_CREATE_REQUEST = "PRODUCT_TYPE_CREATE_REQUEST";
export const PRODUCT_TYPE_CREATE_SUCCESS = "PRODUCT_TYPE_CREATE_SUCCESS";
export const PRODUCT_TYPE_CREATE_FAILURE = "PRODUCT_TYPE_CREATE_FAILURE";

export const PRODUCT_TYPE_DELETE_REQUEST = "PRODUCT_TYPE_DELETE_REQUEST";
export const PRODUCT_TYPE_DELETE_SUCCESS = "PRODUCT_TYPE_DELETE_SUCCESS";
export const PRODUCT_TYPE_DELETE_FAILURE = "PRODUCT_TYPE_DELETE_FAILURE";

export const PRODUCT_TYPE_UPDATE_REQUEST = "PRODUCT_TYPE_UPDATE_REQUEST";
export const PRODUCT_TYPE_UPDATE_SUCCESS = "PRODUCT_TYPE_UPDATE_SUCCESS";
export const PRODUCT_TYPE_UPDATE_FAILURE = "PRODUCT_TYPE_UPDATE_FAILURE";

export const CREATE_MODAL_TOGGLE = "CREATE_MODAL_TOGGLE";
export const UPDATE_MODAL_TOGGLE = "UPDATE_MODAL_TOGGLE";

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

      case PRODUCT_TYPE_DELETE_REQUEST:
        draft.st_typeDeleteLoading = true;
        draft.st_typeDeleteDone = false;
        draft.st_typeDeleteError = null;
        break;

      case PRODUCT_TYPE_DELETE_SUCCESS:
        draft.st_typeDeleteLoading = false;
        draft.st_typeDeleteDone = true;
        draft.st_typeDeleteError = null;
        break;

      case PRODUCT_TYPE_DELETE_FAILURE:
        draft.st_typeDeleteLoading = false;
        draft.st_typeDeleteDone = false;
        draft.st_typeDeleteError = action.data;
        break;

      ////////

      case PRODUCT_TYPE_UPDATE_REQUEST:
        draft.st_typeUpdateLoading = true;
        draft.st_typeUpdateDone = false;
        draft.st_typeUpdateError = null;
        break;

      case PRODUCT_TYPE_UPDATE_SUCCESS:
        draft.st_typeUpdateLoading = false;
        draft.st_typeUpdateDone = true;
        draft.st_typeUpdateError = null;
        draft.updateModal = !draft.updateModal;
        break;

      case PRODUCT_TYPE_UPDATE_FAILURE:
        draft.st_typeUpdateLoading = false;
        draft.st_typeUpdateDone = false;
        draft.st_typeUpdateError = action.data;
        break;

      ////////

      case CREATE_MODAL_TOGGLE:
        draft.createModal = !draft.createModal;
        break;

      case UPDATE_MODAL_TOGGLE:
        draft.updateModal = !draft.updateModal;
        break;

      default:
        break;
    }
  });

export default reducer;
