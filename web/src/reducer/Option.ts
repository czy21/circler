import {createSlice} from "@reduxjs/toolkit";

export const Option = createSlice({
    name: "option",
    initialState: {
        data: {}
    },
    reducers: {
        put: (state, action) => {
            state.data = Object.assign({}, state.data, action.payload)
        }
    }
})
export default Option