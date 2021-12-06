import * as ref from '@/init/reference'
import {default as component} from '@c/index'
import {default as util} from '@/util'
import {default as api} from '@/init/request'
import reducer from "@/reducer";
import {configureStore} from '@reduxjs/toolkit'

const stub = {
    component,
    api,
    ref,
    util,
    store: configureStore({reducer: reducer.reducer}),
    reducer
}
export default stub