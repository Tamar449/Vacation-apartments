import Advertiser from "../Models/Advertiser.js"
import Apartment from "../Models/Apartment.js"
import Category from "../Models/Category.js"
import Area from "../Models/Area.js"
import { saveImages } from "../Middlewares/Upload.js"

export const getAll = (req, res) => {

    Apartment.find()
        .populate([
            { path: 'category', select: '-_id -__v -apartments' },
            { path: 'area', select: '-_id -__v -apartments' },
            { path: 'advertiser', select: '-_id -__v -apartments' }
        ])
        .then(data => {
            res.status(200).send(data)
        })
        .catch(error => { res.status(500).send({ error: error.message }) }
        )
}


export const getById = (req, res) => {
    const { id } = req.params
    Apartment.findById(id)
        .populate([
            { path: 'category', select: '-_id -__v -apartments' },
            { path: 'area', select: '-_id -__v -apartments' },
            { path: 'advertiser', select: '-_id -__v -apartments' }
        ])
        .then(a => {
            if (!a)
                return res.status(404).send({ error: 'apartment not found!' })
            return res.status(200).send(a)
        })
        .catch(error => { res.status(500).send({ error: error.message }) }
        )
}


export const getByArea = (req, res) => {
    const { id } = req.params

    Area.findById(id)
        .populate({
            path: 'apartments', select: '-_id -__v',
            populate: [
                { path: 'category', select: '-_id -__v -apartments' },
                { path: 'advertiser', select: '-_id -__v -apartments' }
            ]
        })
        .then(a => {
            if (!a)
                return res.status(404).send({ error: 'apartments not found!' })
            res.status(200).send(a)
        })
        .catch(error => { res.status(500).send({ error: error.message }) }
        )
}

export const getByCategory = (req, res) => {
    const { id } = req.params

    Category.findById(id)
        .populate([
            {
                path: 'apartments', select: '-_id -__v',
                populate: [
                    { path: 'advertiser', select: '-_id -__v -apartments' },
                    { path: 'area', select: '-_id -__v -apartments' }
                ]
            }
        ])
        .then(a => {
            if (!a)
                return res.status(404).send({ error: 'apartments not found!' })
            res.status(200).send(a)
        })
        .catch(error => {
            res.status(500).send({ error: error.message })
        })
}

export const getByAdvertiser = (req, res) => {

    console.log(req.body.advertiser.id)

    Advertiser.findById(req.body.advertiser.id)
        .populate([
            {
                path: 'apartments', select: '-__v',
                populate: [
                    { path: 'category', select: '-_id -__v -apartments' },
                    { path: 'area', select: '-_id -__v -apartments' }
                ]
            },
        ])
        .then(a => {
            console.log(a)

            if (!a)
                return res.status(404).send({ error: 'apartments not found!' })
            res.status(200).send(a.apartments)
        })
        .catch(error => { res.status(500).send({ error: error.message }) }
        )
}

export const select = (req, res) => {
    const { area, city, category, numbeds, price } = req.query

    const query = {}

    if (area) {
        query.area = area
    }
    if (city) {
        query.city = city
    }
    if (category) {
        query.category = category
    }
    if (numbeds) {
        query.numbeds = { $gte: parseInt(numbeds) }
    }
    if (price) {
        query.price = { $lte: parseInt(price) }
    }

    Apartment.find(query)
        .populate([
            { path: 'category', select: '-_id -__v -apartments' },
            { path: 'area', select: '-_id -__v -apartments' },
            { path: 'advertiser', select: '-_id -__v -apartments' }
        ])
        .then(data =>
            res.status(200).send(data)
        )
        .catch(error =>
            res.status(500).send({ error: error.message })
        )
}

export const create = (req, res) => {

    const { name, description, category, area, city, numbeds, price } = req.body
    const advertiser = req.body.advertiser.id

    if (!req.files || !req.files.images) {
        return res.status(400).send({ message: "No images uploaded" })
    }

    const images = saveImages(name, req.files.images)

    const apartment = new Apartment({
        name,
        description,
        category,
        area,
        city,
        numbeds: parseInt(numbeds),
        price: parseInt(price),
        advertiser,
        images
    })

    apartment.save()
        .then(async a => {
            await Advertiser.findByIdAndUpdate(advertiser, { $push: { apartments: a._id } })
            await Category.findByIdAndUpdate(category, { $push: { apartments: a._id } })
            await Area.findByIdAndUpdate(area, { $push: { apartments: a._id } })
            res.status(200).send(a)
        })
        .catch(error => {
            console.log("error create")
            res.status(500).send({ error: error.message })
        })
}

export const remove = (req, res) => {
    const { id } = req.params
    Apartment.findById(id).
        then(async a => {
            if (!a)
                return res.status(404).send({ error: 'apartment not found!' })
            if (a.advertiser != req.body.advertiser.id)
                return res.status(403).send({ error: 'You do not have permission to perform the request.' })
            await Advertiser.findByIdAndUpdate(a.advertiser, { $pull: { apartments: a._id } })
            await Category.findByIdAndUpdate(a.category, { $pull: { apartments: a._id } })
            await Area.findByIdAndUpdate(a.area, { $pull: { apartments: a._id } })
            await a.deleteOne()
            const allApartments = await Advertiser.findById(req.body.advertiser.id)
                .populate([
                    {
                        path: 'apartments', select: '-__v',
                        populate: [
                            { path: 'category', select: '-_id -__v -apartments' },
                            { path: 'area', select: '-_id -__v -apartments' }
                        ]
                    },
                ])
            res.status(200).send(allApartments)
        })
        .catch(error => {
            res.status(500).send({ error: error.message })
        })
}

export const update = (req, res) => {

    const { id } = req.params

    let fields = { ...req.body }
    delete fields['advertiser']

    Apartment.findByIdAndUpdate(id, fields)
        .then(async a => {

            if (!a)
                return res.status(404).send({ error: 'apartment not found!' })

            if (a.advertiser != req.body.advertiser.id)
                return res.status(403).send({ error: 'You do not have permission to perform the request.' })
            const { category, area } = req.body

            if (category) {
                await Category.findByIdAndUpdate(a.category, { $pull: { apartments: a._id } })
                await Category.findByIdAndUpdate(category, { $push: { apartments: a._id } })
            }
            if (area) {
                await Area.findByIdAndUpdate(a.area, { $pull: { apartments: a._id } })
                await Area.findByIdAndUpdate(area, { $push: { apartments: a._id } })
            }
            const allApartments = await Advertiser.findById(req.body.advertiser.id)
                .populate([
                    {
                        path: 'apartments', select: '-__v',
                        populate: [
                            { path: 'category', select: '-_id -__v -apartments' },
                            { path: 'area', select: '-_id -__v -apartments' }
                        ]
                    },
                ])
            res.status(200).send(allApartments)
        })
        .catch(error => {
            res.status(500).send({ error: error.message })
        })

}
