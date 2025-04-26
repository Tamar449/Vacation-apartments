import axios from "axios"

// axios.defaults.baseURL = `http://localhost:3001/advertiser`

export const login = (email, password) => {
    console.log({ email, password })
    return axios.post(`advertiser/login`, { email, password })
}

export const register = (name, email, password, phone, addionalPhone) => {
    return axios.post(`advertiser/register`, { name, email, password, phone, addionalPhone })
}

