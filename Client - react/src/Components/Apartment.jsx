import { ImageSlider } from "./ImageSlider"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import { useNavigate } from "react-router";
import { useState } from "react";
import { deleteApartment, update } from "../Api/apartmentService";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateApartmentDialog from "./PersonalArea/UpdateApartment";
import { fetchApartments } from "./PersonalArea/GetAll";
import { useDispatch } from "react-redux";
import { setCurrentApartments } from "../Redux/ApartmentSlice";

export const Apartment = (props) => {
    const { source } = props;
    const { _id, name, images, category, area, city, numbeds, price, phone } = props.apartment

    const nav = useNavigate()
    const [openDialog, setOpenDialog] = useState(false);
    const [apartmentData, setApartmentData] = useState(props.apartment);
    const dis = useDispatch()

    const [openD, setOpenD] = useState(false);

    const handleClickOpen = () => {
        setOpenD(true);
    };

    const handleClose = () => {
        setOpenD(false);
    };

    const showDetails = () => {
        nav(`/details/${_id}`);
    };

    // פונקציה לפתיחת הדיאלוג
    const updateApartment = () => {
        setOpenDialog(true);
    };

    const deleteA = async () => {
        deleteApartment(_id)
            .then(res => {
                dis(setCurrentApartments(res.data.apartments))
            })
            .catch(err => {
                console.log("error: ", err);
            });
    };

    // פונקציה לשליחה לעדכון
    const handleUpdate = async (updatedData) => {
        try {
            const res = await update(_id, updatedData)
            dis(setCurrentApartments(res.data.apartments))

            setApartmentData(prevData => ({
                ...prevData,
                ...updatedData
            }));
            setOpenDialog(false);
        } catch (error) {
            console.error("Error updating apartment:", error);
        }
    };

    return <div className="apartment flex-r">
        <div className="details">
            <div className="flex-c text">
                <h3>{name}</h3>
                <p>אזור {area.name}, {city}</p>
                <p>{numbeds} מיטות</p>
                <p>{price} ללילה</p>
                <b>{phone}</b>
            </div>
            <div className="btns">
                <Button variant="contained" onClick={showDetails}>לפרטים נוספים</Button>
                {source === "AdvertiserApartments" && <div>
                    <IconButton onClick={updateApartment}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={handleClickOpen}>
                        <DeleteIcon />
                    </IconButton>
                </div>}
            </div>
        </div>
        <ImageSlider images={images}></ImageSlider>


        {/* דיאלוג העדכון */}
        <UpdateApartmentDialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            apartmentData={apartmentData}
            onUpdate={handleUpdate}
        />

        <Dialog
            open={openD}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"?האם אתה בטוח שברצונך למחוק דירה זו"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    .לאחר הממחיקה לא תוכל לשחזר את הדירה
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>ביטול</Button>
                <Button onClick={()=>{deleteA(); handleClose()}} autoFocus>
                    אישור
                </Button>
            </DialogActions>
        </Dialog>
    </div>
}