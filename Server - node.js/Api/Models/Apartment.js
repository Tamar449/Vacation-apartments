import mongoose from "mongoose";

const apartmentSchema = mongoose.Schema({
    name: String,
    description: {
        type: String,
        require: true
    },
    images: [{
        type: String
        // data: Buffer,
        // contentType: String
    }],
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category'
    },
    // city: {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'City'
    // },
    area: {
        type: mongoose.Types.ObjectId,
        ref: 'Area'
    },
    city: {
        type: String,
        require: true
    },
    numbeds: {
        type: Number,
        require: true
    },
    more: [{ type: String }],
    price: Number,
    advertiser: {
        type: mongoose.Types.ObjectId,
        ref: 'Advertiser'
    }
})

export default mongoose.model('Apartment', apartmentSchema)