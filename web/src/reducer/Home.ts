import {createSlice} from "@reduxjs/toolkit";

const slice = createSlice({
    name: "home",
    initialState: {
        collapsed: false
    },
    reducers: {
        collapse: (state) => {
            return Object.assign({}, state, {collapsed: !state.collapsed});
        }
    }
})
const action = {...slice.actions}
export default {
    slice,
    action
}