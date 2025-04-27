import { Button } from "@mui/material"
import { useNavigate } from "react-router"
import { Nav } from "./Nav"
import { AdvertiserApartments } from "./PersonalArea/GetAll"

export const PersonalArea = () => {
    const nav = useNavigate()


    return <div>
        <Nav source = {"personal"}></Nav>
        <AdvertiserApartments></AdvertiserApartments>
    </div>
}