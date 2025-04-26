import multer from "multer"
import path from "path"
import fs from "fs"

// סינון קבצים: רק תמונות
const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/gif"
    ) {
        cb(null, true) // אישור קובץ
    } else {
        cb(new Error("Only image files are allowed!"), false) // דחיית קובץ
    }
}

// Middleware לפענוח `formData` (גם טקסט וגם תמונות)
export const upload = multer({
    storage: multer.memoryStorage(), 
    fileFilter: fileFilter
}).fields([{ name: "images", maxCount: 100 }]) 

// פונקציה לשמירת התמונות בתיקייה
export const saveImages = (apartmentName, files) => {
    if (!apartmentName) {
        throw new Error("Apartment name is required")
    }

    const directoryPath = path.join("../Client - react/public/pictures", apartmentName)

    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true })
    }

    return files.map(file => {
        const fileName = Date.now() + path.extname(file.originalname)
        const filePath = path.join(directoryPath, fileName)
        fs.writeFileSync(filePath, file.buffer)
        return `/pictures/${apartmentName}/${fileName}`
    })
}
