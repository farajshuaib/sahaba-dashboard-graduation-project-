import accountReducer from "./account/reducers";
import  generalReducers  from "./general/reducers";

const rootReducers = {
  account: accountReducer,
  general: generalReducers
};

export default rootReducers;
