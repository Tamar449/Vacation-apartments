import Advertiser from "../Models/Advertiser.js"
import jwt from 'jsonwebtoken'


export const getAll = (req, res) => {
    Advertiser.find()
        .then(data => {
            res.status(200).send(data)
        })
        .catch(error => res.status(500).send({ error: error.message }))
}


export const login = (req, res) => {

    const { email, password } = req.body
    Advertiser.find({ email })
        .then(advertisers => {
            if (advertisers.length == 0) {
                return res.status(404).send({ error: '!משתמש לא קיים'})
            }
            let [advertiser] = advertisers

            if (advertiser.password != password) {
                return res.status(404).send({ error: '!סיסמה שגויה' })
            }

            const token = jwt.sign(
                {
                    id: advertiser._id,
                    name: advertiser.name,
                    email: advertiser.email,
                    phone: advertiser.phone,
                    additionalPhone: advertiser.additionalPhone
                },

                "VY158%GYjnd$,o*hu",
                {
                    expiresIn: '1y',
                }
            )

            res.status(200).send({ advertiser, token })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const register = (req, res) => {

    const { name, email, password, phone, additionalPhone } = req.body

    const advertiser = new Advertiser({
        name,
        email,
        password,
        phone,
        additionalPhone,
        apartments: []
    })

    Advertiser.find({ email })
        .then(advertisers => {
            if (advertisers.length > 0) {
                return res.status(404).send({ error: '!משתמש עם מייל זה כבר קיים במערכת' })
            }

            advertiser.save()
                .then(async a => {
                    const token = jwt.sign(
                        {
                            id: advertiser._id,
                            name,
                            email,
                            phone,
                            additionalPhone
                        },

                        "VY158%GYjnd$,o*hu",
                        {
                            expiresIn: '1y',
                        }
                    )
                    res.status(200).send({ advertiser: a, token })
                })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

// export const getApartments = (req, res) => {

//     console.log(req.body.advertiser.id)

//     Advertiser.findById(req.body.advertiser.id)
//         .populate([
//             {
//                 path: 'apartments', select: '-__v',
//                 populate: [
//                     { path: 'category', select: '-_id -__v -apartments' },
//                     { path: 'area', select: '-_id -__v -apartments' }
//                 ]
//             },
//         ])
//         .then(a => {
//             console.log(a);
            
//             if (!a)
//                 return res.status(404).send({ error: 'apartments not found!' })
//             res.status(200).send(a.apartments)
//         })
//         .catch(error => { res.status(500).send({ error: error.message }) }
//         )
// }