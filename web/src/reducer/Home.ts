import {createSlice} from "@reduxjs/toolkit";


interface Locale {
    key: string
    messages: any
}

const slice = createSlice({
    name: "home",
    initialState: {
        collapsed: false,
        locale: {} as Locale
    },
    reducers: {
        collapse: (state) => {
            return Object.assign({}, state, {collapsed: !state.collapsed});
        },
        switchLocale: (state, action) => {
            return Object.assign({}, state, {locale: action.payload});
        }
    }
})
const action = {...slice.actions}
export default {
    slice,
    action
}