import mongoose from "mongoose";

const advertiserSchema = mongoose.Schema({
    name: String,
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    AdditionalPhone: String,
    apartments: [{
        type: mongoose.Types.ObjectId,
        ref: 'Apartment'
    }]
})

export default mongoose.model('Advertiser', advertiserSchema)