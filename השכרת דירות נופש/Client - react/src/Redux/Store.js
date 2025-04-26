import { configureStore } from "@reduxjs/toolkit"
import advertiserReducer from './AdvertiserSlice'
import apartmentReducer from './ApartmentSlice'


const store = configureStore({
    
    reducer: {
        advertiser: advertiserReducer,
        apartments: apartmentReducer
    }
})

export default store