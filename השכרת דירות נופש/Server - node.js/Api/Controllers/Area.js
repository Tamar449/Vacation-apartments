import Apartment from "../Models/Apartment.js"
import Area from "../Models/Area.js"

export const getAll = (req, res) => {
    Area.find()
        .then(data => {
            res.status(200).send(data)
        })
        .catch(error => res.status(500).send({ error: error.message }))
}

export const create = (req, res) => {
    const { name } = req.body

    const area = new Area({
        name,
        apartments: []
    })
    area.save()
        .then(c => {
            res.status(200).send(c)
        })
        .catch(error => {
            res.status(500).send({ error: error.message })
        })

}

// export const getApartments = (req, res) => {
//     const { id } = req.params

//     Area.findById(id)
//         .populate({ path: 'apartments', select: '-_id -__v',
//             populate: [
//                 { path: 'category', select: '-_id -__v -apartments' },
//                 { path: 'advertiser', select: '-_id -__v -apartments' }
//             ]
//         })
//         .then(a => {
//             if (!a)
//                 return res.status(404).send({ error: 'apartments not found!' })
//             res.status(200).send(a)
//         })
//         .catch(error => { res.status(500).send({ error: error.message }) }
//         )
// }