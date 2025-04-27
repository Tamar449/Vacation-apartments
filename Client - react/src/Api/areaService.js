import axios from "axios"

export const getAllAreas = () => {
    return axios.get(`/area`)
}
