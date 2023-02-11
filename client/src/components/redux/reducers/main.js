import { getProductsReducers } from "./Productreducers";

import {combineReducers} from "redux";

const rootreducers = combineReducers({
    getproductscontent : getProductsReducers
});

export default rootreducers;