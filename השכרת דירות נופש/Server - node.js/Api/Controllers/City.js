// import City from "../Models/City.js"

// export const getAll = (req, res) => {
//     City.find()
//         .populate({ path: 'apartments', select: '-_id -__v' })
//         .then(data => {
//             res.status(200).send(data)
//         })
//         .catch(error => res.status(500).send({ error: error.message }))
// }

// export const create = (req, res) => {
//     const { name } = req.body

//     const city = new City({
//         name,
//         apartments: []
//     })
//     city.save()
//         .then(c => {
//             res.status(200).send(c)
//         })
//         .catch(error => {
//             res.status(500).send({ error: error.message })
//         })

// }

// export const getApartments = (req, res) => {
//     const { id } = req.params

//     Apartment.findById(id)
//         .populate([
//             { path: 'apartment', select: '-_id -__v' },
//             { path: 'category', select: '-_id -__v -apartments' },
//             { path: 'advertiser', select: '-_id -__v -apartments' }
//         ])
//         .then(a => {
//             if (!a)
//                 return  res.status(404).send({ error: 'apartments not found!' })
//             res.status(200).send(a)
//         })
//         .catch(error => { res.status(500).send({ error: error.message }) }
//         )
// }