import express from 'express'
import multer from 'multer'
// const storage = multer.memoryStorage(); // או storage אחר לפי הצורך
// const upload = multer({ storage: storage });
import {
    getAll,
    getById,
    getByArea,
    getByAdvertiser,
    getByCategory,
    create,
    remove,
    update,
    select
} from '../Controllers/Apartment.js'
import { categoryExists, areaExists, checkAuth } from '../Middlewares/ApartmentMiddleware.js'
import { upload } from '../Middlewares/Upload.js'

// const upload = multer().fields([
//     { name: "images", maxCount: 100 }
// ]);


const router = express.Router()
router.get('', getAll)
router.get('/byId/:id', getById)
router.get('/byArea/:id', getByArea)
router.get('/byAdvertiser/:id', checkAuth, getByAdvertiser)
router.get('byCategory/:id', getByCategory)
router.get('/select', select)
router.post('', upload, checkAuth, areaExists, categoryExists, create)
router.delete('/:id', checkAuth, remove)
router.patch('/:id', checkAuth, categoryExists, areaExists, update)

export default router