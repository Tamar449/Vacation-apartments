import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import store from "../Redux/Store"
import { Routing } from "./Routing"
import { Apartments } from "./Apartments"
import { useEffect } from "react"

export const Main = () => {

    return <>
        <Provider store={store}>
            <BrowserRouter>
                <Routing></Routing>
            </BrowserRouter>
        </Provider>

    </>
}