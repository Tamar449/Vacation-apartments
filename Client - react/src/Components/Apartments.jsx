import { useDispatch, useSelector } from "react-redux";
import { getAllApartments, select } from "../Api/apartmentService";
import { getAllAreas } from "../Api/areaService";
import { getAllCategories } from "../Api/categoryService";
import { Apartment } from "./Apartment";
import { useEffect, useState } from "react";
import { setApartments } from "../Redux/ApartmentSlice";
import { Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from "@mui/material";


export const Apartments = () => {

    const dis = useDispatch()
    const apartments = useSelector((state) => state.apartments.apartments);
    const [areas, setAreas] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getAllApartments()
            .then(response => {
                dis(setApartments(response.data));
            })
            .catch(err => console.log({ error: 'Error fetching apartments:', err }));
    }, []);

    useEffect(() => {
        getAllAreas()
            .then(response => setAreas(response.data))
            .catch(err => console.log({ error: 'Error fetching areas:', err }));
    }, []);

    useEffect(() => {
        getAllCategories()
            .then(response => setCategories(response.data))
            .catch(err => console.log({ error: 'Error fetching categories:', err }));
    }, []);

    const [cities, setCities] = useState([])
    useEffect(() => {
        if (cities.length == 0) {
            let citySet = new Set();
            apartments.forEach((a) => citySet.add(a.city));
            setCities(Array.from(citySet));
        }
    }, [apartments]);



    const [category, setCategory] = useState('')
    const [area, setArea] = useState('')
    const [city, setCity] = useState('')
    const [numbeds, setnumbeds] = useState()
    const [price, setPrice] = useState()

    async function search() {

        let queryParams = [];
        if (area) queryParams.push(`area=${area}`);
        if (city) queryParams.push(`city=${city}`);
        if (category) queryParams.push(`category=${category}`);
        if (numbeds != null) queryParams.push(`numbeds=${numbeds}`);
        if (price != null) queryParams.push(`price=${price}`);

        let q = queryParams.join("&");

        await select(q).then(response => {
            dis(setApartments(response.data));
        })
            .catch(err => console.log({ error: 'Error fetching apartments:', err }));
    }

    return <div className="apartments center-w">

        {apartments && <div className="results"> {apartments.map((a, i) => <Apartment key={i} apartment={a}></Apartment>)} </div>}

        <div className="filter">

            <FormControl className="field">
                <InputLabel id="demo-simple-select-label">קטגוריה</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    label="קטגוריה"
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <MenuItem value={''}>הכל</MenuItem>
                    {categories.map(c => (<MenuItem value={c._id} key={c._id}>{c.name}</MenuItem>))}
                </Select>
            </FormControl>

            <FormControl className="field" >
                <InputLabel id="demo-simple-select-label">אזור בארץ</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={area}
                    label="אזור בארץ"
                    onChange={(e) => setArea(e.target.value)}
                >
                    <MenuItem value={''}>הכל</MenuItem>
                    {areas.map(a => (<MenuItem value={a._id} key={a._id}>{a.name}</MenuItem>))}
                </Select>
            </FormControl>

            <FormControl className="field"  >
                <InputLabel id="demo-simple-select-label">עיר</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={city}
                    label="עיר"
                    onChange={(e) => setCity(e.target.value)}
                >
                    <MenuItem value={''}>הכל</MenuItem>
                    {Array.from(cities).map(c => (<MenuItem key={c} value={c}>{c}</MenuItem>))}
                </Select>
            </FormControl>


            <TextField
                className="field"
                id="outlined-basic"
                label="מספר מיטות"
                type="number"
                variant="outlined"
                onChange={(e) => setnumbeds(e.target.value)}
                inputProps={{
                    min: 0
                }}
            />

            <TextField
                className="field"
                id="outlined-basic"
                label="מחיר"
                type="number"
                variant="outlined"
                onChange={(e) => setPrice(e.target.value)}
                inputProps={{
                    min: 0
                }}
            />

            <Button variant="contained" onClick={search} className="center-w">חיפוש</Button>


        </div>
    </div>

}



