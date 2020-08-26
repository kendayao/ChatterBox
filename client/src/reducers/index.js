import screenNameReducer from "./screenName"
import {combineReducers} from 'redux'
import screeNameReducer from "./screenName"

const allReducers=combineReducers({
    screenName: screeNameReducer
})

export default allReducers