import { Route, Routes } from "react-router"
import { Login } from "./Login"
import { Register } from "./Register"
import { Home } from "./Home"
import { Details } from "./Details"
import { PersonalArea } from "./PersonalArea"
import { AddApartment } from "./AddApartment"

export const Routing = () => {

    return <>
        <Routes>
            <Route path="" element={<Home></Home>}></Route>
            <Route path="login" element={<Login></Login>}></Route>
            <Route path="register" element={<Register></Register>}></Route>
            <Route path="details/:id" element={<Details></Details>}></Route>
            <Route path="advertiser" element={<PersonalArea></PersonalArea>}></Route>
            <Route path="advertiser/add" element={<AddApartment></AddApartment>}></Route>

        </Routes>
    </>
}