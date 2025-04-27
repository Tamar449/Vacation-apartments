import { useEffect, useState } from "react";
import { getAllAreas } from "../Api/areaService";
import { getAllCategories } from "../Api/categoryService";
import { Alert, FormControl, InputLabel, MenuItem, Select, Snackbar, TextField } from "@mui/material";
import { create } from '../Api/apartmentService';
import { useNavigate } from "react-router";
export const AddApartment = () => {

    const [areas, setAreas] = useState([])
    const [categories, setCategories] = useState([])
    const [res, setRes] = useState('')
    const [open, setOpen] = useState(false);

    const nav = useNavigate()

    useEffect(() => {
        const fetch = async () => {
            try {
                let response = await getAllAreas();
                setAreas(response.data);

            } catch (err) {
                console.log({ error: 'Error fetching areas:', err });
            }

            try {
                let res = await getAllCategories();
                setCategories(res.data);
            } catch (err) {
                console.log({ error: 'Error fetching categories:', err });
            }
        };

        fetch();
    }, []);


    const [images, setImages] = useState([]);
    const [newApartment, setNewApartment] = useState({
        name: '',
        description: '',
        area: '',
        city: '',
        category: '',
        numbeds: '',
        price: '',
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewApartment(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        setImages(e.target.files);
    };

    const add = async (event) => {
        event.preventDefault();
        newApartment.images = images

        let formData = new FormData();
        formData.append("name", newApartment.name);
        formData.append("description", newApartment.description);
        formData.append("area", newApartment.area);
        formData.append("city", newApartment.city);
        formData.append("category", newApartment.category);
        formData.append("numbeds", newApartment.numbeds);
        formData.append("price", newApartment.price);
        Array.from(images).forEach((image) => {
            formData.append("images", image);
        })


        await create(formData).then(res => console.log("succes")).catch(err => console.log(err.message))
            .then(x => {
                setNewApartment({
                    name: '',
                    description: '',
                    area: '',
                    city: '',
                    category: '',
                    numbeds: '',
                    price: '',
                })
                document.querySelector('input[type="file"]').value = ''; // איפוס שדה העלאת קבצים
                setRes('!הדירה נוספה בהצלחה')
                setOpen(true)
                setTimeout(() => {
                    setOpen(false)
                    setRes('')
                }, 5000);
            })
            .catch(err => console.log({ error: err }))
    };

    return <div className="add-form">
        <Snackbar
            open={open}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={6000}
        >
            <Alert
                severity="success"
                variant="filled"
                sx={{ width: '100%' }}
            >
                {res}
            </Alert>
        </Snackbar>

{/* className="container-form" */}
        <div className="container-form">
            <div className="login-box ">

                <div>
                    <img className='logo' src={`${process.env.PUBLIC_URL}/images/logo.png`} onClick={()=>{nav('/')}} ></img>
                    <h2>הוספת דירה</h2>
                </div>

                <form id="add-form" onSubmit={event => add(event)}>
                    <div className="input-group">
                        <TextField className="in"
                            id="outlined-basic"
                            label="שם"
                            type='search'
                            name="name"
                            variant="outlined"
                            value={newApartment.name}
                            onChange={event => handleInputChange(event)}
                        // helperText="Please enter apartment's name"
                        />
                        <TextField className="in"
                            id="outlined-basic"
                            label="תאור"
                            type='search'
                            variant="outlined"
                            name="description"
                            value={newApartment.description}
                            onChange={event => handleInputChange(event)}
                        // helperText="Please enter Description about the apartment"
                        />
                        {areas && <FormControl fullWidth className="in">
                            <InputLabel id="demo-simple-select-label">אזור</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={newApartment.area}
                                label="אזור"
                                name="area"
                                onChange={handleInputChange} // השתנה לפונקציה החדשה
                            >
                                {areas.map(a => (
                                    <MenuItem key={a._id} value={a._id}>
                                        {a.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>}

                        <TextField className="in"
                            id="outlined-basic"
                            label="עיר"
                            type='search'
                            variant="outlined"
                            name="city"
                            value={newApartment.city}
                            onChange={event => handleInputChange(event)}
                        // helperText="Please enter apartment's city"
                        />
                        {categories && <FormControl fullWidth className="in">
                            <InputLabel id="demo-simple-select-label">קטגוריה</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={newApartment.category}
                                label="קטגוריה"
                                name="category"
                                onChange={handleInputChange} // השתנה לפונקציה החדשה
                            >
                                {categories.map(c => (
                                    <MenuItem key={c._id} value={c._id}>
                                        {c.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>}
                        <TextField className="in"
                            id="outlined-number"
                            label="מספר מיטות"
                            type="number"
                            variant="outlined"
                            name="numbeds"
                            value={newApartment.numbeds}
                            onChange={event => handleInputChange(event)}
                        // helperText="Please enter num of beds"
                        />
                        <TextField className="in"
                            id="outlined-basic"
                            label="מחיר"
                            type="number"
                            variant="outlined"
                            name="price"
                            value={newApartment.price}
                            onChange={event => handleInputChange(event)}
                            // helperText="Please enter price per night"
                            inputProps={{
                                min: 1
                            }}
                        />
                        {/* <TextField className="in"
                            id="outlined-basic"
                            label="עוד..."
                            type='search'
                            variant="outlined"
                            name="more"
                            // value={newApartment.more}
                        // onChange={handleInputChange}
                        // helperText="(:More about your Diamond"
                        /> */}
                        <div>
                            <input className="in" type="file" multiple onChange={handleImageChange} />
                        </div>
                    </div>
                    <button type="submit" className="submit-btn">הוסף</button>
                </form>
            </div>
        </div>
    </div>

}

