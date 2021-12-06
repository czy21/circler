import Home from './Home'
import Option from './Option'

export default {
    reducer: {
        home: Home.reducer,
        option: Option.reducer
    },
    action: {
        home: Home.actions,
        option: Option.actions
    }
}