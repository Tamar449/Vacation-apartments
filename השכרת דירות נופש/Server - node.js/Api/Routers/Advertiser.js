import express from 'express'
import {
    getAll,
    login,
    register,
    // getApartments
} from '../Controllers/Advertiser.js'
import { checkAuth } from '../Middlewares/ApartmentMiddleware.js'

const router = express.Router()
router.get('', getAll)
router.post('/login', login)
router.post('/register', register)
// router.get('/apartments', checkAuth, getApartments)
export default router