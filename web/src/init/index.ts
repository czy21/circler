import * as ref from '@/init/reference'
import {default as component} from '@c/index'
import {default as util} from '@/util'
import {default as api} from '@/init/request'
import reducer from "@/reducer";
import {configureStore} from '@reduxjs/toolkit'

const store: ref.redux.Store = configureStore({reducer: reducer.reducer})
const stub = {
    component,
    api,
    ref,
    util,
    store,
    reducer
}
export default stub