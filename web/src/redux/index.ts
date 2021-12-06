import stub from "@/init";
import {Home} from '@/redux/reducer/Home'
import {Option} from '@/redux/reducer/Option'

export default stub.ref.redux.combineReducers({
    Home,
    Option
})