import { useDispatch, useSelector } from "react-redux";
import { Apartment } from "../Apartment";
import { useEffect } from "react";
import { setCurrentApartments } from "../../Redux/ApartmentSlice";
import { getByAdvertiser } from "../../Api/apartmentService";
import { Button } from "@mui/material";
import PostAddIcon from '@mui/icons-material/PostAdd';
import { useNavigate } from "react-router";

export const AdvertiserApartments = () => {
    const dis = useDispatch();
    const advertiser = useSelector((state) => state.advertiser.currentAdvertiser);
    const apartments = useSelector((state) => state.apartments.currentApartment);
    const nav = useNavigate()

    const fetchApartments = async () => {
        console.log("advertiser", advertiser);

        if (advertiser && advertiser._id) {
            try {
                const response = await getByAdvertiser(advertiser._id);
                dis(setCurrentApartments(response.data));

            } catch (err) {
                console.log({ error: 'Error fetching apartments:', err });
            }
        } else {
            console.log('Advertiser is not defined or does not have an ID');
        }
    };

    useEffect(() => {
        fetchApartments();
    }, [advertiser]);


    return (
        <div className="center-w personalArea">
            <div className="results">
                <Button variant="contained" endIcon={<PostAddIcon />} onClick={() => { nav('./add') }}>
                    הוספת דירה
                </Button>
                {Array.isArray(apartments) && apartments.length > 0 && 
                apartments.map((a, i) => <Apartment key={i} apartment={a} source="AdvertiserApartments" />)
            }
            </div>
        </div>
    );

};