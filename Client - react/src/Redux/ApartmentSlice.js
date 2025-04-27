import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    apartments: [],
    currentApartment: {},
}

const apartmentsSlice = createSlice({
    name: "apartments",
    initialState,
    reducers: {
        setApartments: (state, action) => {
            state.apartments = action.payload
        },
        setCurrentApartments: (state, action) => {
            state.currentApartment = action.payload
        }
    }
})

export const { setApartments, setCurrentApartments } = apartmentsSlice.actions
export default apartmentsSlice.reducer
