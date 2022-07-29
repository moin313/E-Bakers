import { createStore } from "redux"
import {Reducer} from "./reducer"


{/*IT WILL CREATE A STORE FOR UPDATING THE COMPONENT */}

var store = createStore(Reducer)

export default store