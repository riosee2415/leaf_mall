import produce from "immer";

export const initailState = {
  me: null,
  activeMenu: "1",
};

export const ACTIVE_MENU_MODIFY = "ACTIVE_MENU_MODIFY";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ACTIVE_MENU_MODIFY:
        draft.activeMenu = action.data;
        break;

      default:
        break;
    }
  });

export default reducer;
