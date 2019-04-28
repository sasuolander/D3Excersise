import { GetData_started,GetData_Success,GetData_Fail } from "./../action/types";
import { stat } from "fs";

const initialState = {
  CO2DataSet: [],
  completed:false,
  loading:false,
  error:null
};
export default (state = initialState, action) => {
  switch (action.type) {
      case GetData_started:
      return{
...state,
loading: true
      };
    case GetData_Success:
      return {
        ...state,
        CO2DataSet: action.payload,
        loading:false,
        completed:action.completed
      };
      case GetData_Fail:
      return{
        ...state,
        loading:false,
        error:action.error
      }
    default:
      return state;
  }
};
