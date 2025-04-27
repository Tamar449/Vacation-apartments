import axios from "axios"

axios.defaults.baseURL = `http://localhost:3001/`

export const getAllApartments = () => {
    return axios.get(`/apartment`)
}

export const getById = (id) => {
    return axios.get(`/apartment/byid/${id}`)
}

export const getByArea = (id) => {
    return axios.get(`/apartment/byarea/${id}`)
}

export const getByAdvertiser = (id) => {
    const token = localStorage.getItem("token")
    return axios.get(`/apartment/byadvertiser/${id}` ,{
        headers:
            { Authorization: `Bearer ${token}` }
    })
}

export const getByCategory = (id) => {
    return axios.get(`/apartment/bycategory/${id}`)
}


export const select = (q) => {

    return axios.get(`/apartment/select?${q}`);
};

export const create = async (aparetment) => {

    const token = localStorage.getItem("token")

    axios.post(`/apartment`, aparetment, {
        headers:
            { Authorization: `Bearer ${token}` }
    })

}

export const deleteApartment = (id) => {
    const token = localStorage.getItem("token")
    return axios.delete(`/apartment/${id}`, {
        headers:
            { Authorization: `Bearer ${token}` }
    })
}

export const update = (id, updateData) => {
    const token = localStorage.getItem("token")
    console.log("asd",token);
    
    return axios.patch(`/apartment/${id}`,updateData, {
        headers:
            { Authorization: `Bearer ${token}` }
    })
}

