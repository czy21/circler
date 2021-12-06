import {createSlice} from "@reduxjs/toolkit";

const Home = createSlice({
    name: "home",
    initialState: {
        collapsed: false
    },
    reducers: {
        collapse: state => {
            return Object.assign({}, state, {collapsed: !state.collapsed});
        }
    }
})
export default Home