const CURSOR_MOVE = "CURSOR_MOVE";

const defaultCursorState = {
  cursorX: 0,
  cursorY: 0
};

export const cursorReducer = (state = defaultCursorState, action: any) => {
  switch (action.type) {
    case CURSOR_MOVE:
      return {
        cursorX: action.cursorX,
        cursorY: action.cursorY
      };
    default:
      return state;
  }
};

export const mapCursorStateToProps = (state: any) => {
  return {
    cursorX: state.cursorX,
    cursorY: state.cursorY
  };
};

export const mapCursorDispatchToProps = (dispatch: any) => {
  return {
    cursorMove: (cursorX: number, cursorY: number) => {
      dispatch({ type: CURSOR_MOVE, cursorX, cursorY });
    }
  };
};
