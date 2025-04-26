import Category from "../Models/Category.js"

export const getAll = (req, res) => {
    Category.find()
        .then(data => {
            res.status(200).send(data)
        })
        .catch(error => res.status(500).send({ error: error.message }))
}

export const create = (req, res) => {
    const { name } = req.body

    const category = new Category({
        name,
        apartments: []
    })
    category.save()
        .then(c => {
            res.status(200).send(c)
        })
        .catch(error => {
            res.status(500).send({ error: error.message })
        })

}


export const getApartments = (req, res) => {
    const { id } = req.params

    Category.findById(id)
        .populate([
            { path: 'apartments', select: '-_id -__v' ,
                populate: [
                    { path: 'advertiser', select: '-_id -__v -apartments' },
                    { path: 'area', select: '-_id -__v -apartments' }
                ]
            }
        ])
        .then(a => {
            if (!a)
                return  res.status(404).send({ error: 'apartments not found!' })
            res.status(200).send(a)
        })
        .catch(error => { res.status(500).send({ error: error.message }) 
        })
}
