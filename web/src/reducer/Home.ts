import {createSlice} from "@reduxjs/toolkit";
import locale from '@/locale'

interface Locale {
    key: string
    message: any
}

const slice = createSlice({
    name: "home",
    initialState: {
        collapsed: false,
        locale: {
            key: "zh_CN",
            message: locale
        } as Locale
    },
    reducers: {
        collapse: (state) => {
            return {...state, ...{collapsed: !state.collapsed}};
        },
        switchLocale: (state, action) => {
            return {...state, locale: {...state.locale, ...action.payload}}
        }
    }
})
const action = {...slice.actions}
export default {
    slice,
    action
}