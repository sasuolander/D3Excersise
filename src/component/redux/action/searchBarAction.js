import { updateIndex, updateInput } from "./types";

export const updateIndexAction = index => dispatch => {
  dispatch({
    type: updateIndex,
    payload: index
  });
};

export const updateInputAction = input => dispatch => {
  dispatch({
    type: updateInput,
    payload: input
  });
};
