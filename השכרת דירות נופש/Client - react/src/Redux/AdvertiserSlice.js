import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentAdvertiser: {},
}

const advertiserSlice = createSlice({
    name: "advertiser",
    initialState,
    reducers: {
        setAdvertiser: (state, action) => {
            state.currentAdvertiser = action.payload
        }
    }
})

export const {setAdvertiser} = advertiserSlice.actions
export default advertiserSlice.reducer
