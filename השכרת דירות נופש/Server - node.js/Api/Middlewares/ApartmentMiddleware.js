import Category from "../Models/Category.js"
// import City from "../Models/City.js"
import Area from "../Models/Area.js"
import jwt from 'jsonwebtoken'

export const categoryExists = (req, res, next) => {


    const { category } = req.body

    if (!category) {
        if (req.method == 'POST')
            return res.status(400).send({ error: 'category is required!' })
        else {
            return next()
        }
    }

    Category.find({ _id: category })
        .then(category => {
            if (!category) {
                return res.status(404).send({ error: 'category not found!' })
            }
            next()
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const areaExists = (req, res, next) => {

    const { area } = req.body

    if (!area) {
        if (req.method == 'POST')
            return res.status(400).send({ error: 'area is required!' })
        else {
            return next()
        }
    }

    Area.find({ _id: area })
        .then(area => {
            if (!area) {
                return res.status(404).send({ error: 'area not found!' })
            }
            next()
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const checkAuth = (req, res, next) => {
    console.log("headers", req.headers);
    

    if (!req.headers.authorization) {
        return res.status(401).send({ error: 'Authorization failed!' })
    }

    const arr = req.headers.authorization.split(' ')

    if (arr.length == 1) {
        return res.status(401).send({ error: 'Authorization failed!' })
    }

    const [x, token] = arr

    jwt.verify(token, process.env.SECRET, (error, decoded) => {
        if (error || !decoded) {
            return res.status(401).send({ error: error.message })
        }
        req.body.advertiser = decoded
        next()
    })

}