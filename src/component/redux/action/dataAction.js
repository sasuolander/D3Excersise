import Axios from "axios";

import { API_URL } from "./../constant";
import { GetData_Success, GetData_started, GetData_Fail } from "./types";
import { GeneralArray } from "./dataFunction";

export const getDataAction =  () => {return async (dispatch,getState) => {
  //https://alligator.io/redux/redux-thunk/
  dispatch(getDataStarted());
  //console.log('start', getState());
  return Axios.get(API_URL)
    .then(res => {
      setTimeout(() => {
      dispatch(getDataSucces(res.data));
    }, 2500);
    })
    .catch(err => {
      return dispatch(getDataFail(err));
    });
}};

const getDataStarted = () => ({
  type: GetData_started
});
const getDataSucces = payload => ({
  type: GetData_Success,
  payload: GeneralArray(payload),
  completed: true
});
const getDataFail = err => ({
  type: GetData_Fail,
  error: "Failled to load " + err
});
