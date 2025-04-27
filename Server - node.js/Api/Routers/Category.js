import express from 'express'
import {
    getAll,
    create,
    // getApartments
} from '../Controllers/Category.js'

const router = express.Router()
router.get('', getAll)
router.post('', create) 
// router.get('/apartments/:id', getApartments)

export default router