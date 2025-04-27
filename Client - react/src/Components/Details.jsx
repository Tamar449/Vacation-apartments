import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getById } from "../Api/apartmentService";
import { Card, CardContent, Typography, Grid } from "@mui/material";

export const Details = () => {
    const { id } = useParams();
    const [apartment, setApartment] = useState(null);

    useEffect(() => {
        getById(id).then(res => {
            setApartment(res.data);
        })
        .catch(err => {
            console.log({ error: err });
        });
    }, [id]);

    return (
        <div>
            {apartment && (
                <Card variant="outlined" sx={{ margin: 2 }}>
                    <CardContent dir="rtl">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h5" align="center" sx={{ marginBottom: 2 }}>
                                    {apartment.name}
                                </Typography>
                                <Grid container spacing={1}>
                                    {apartment.images.slice(0, 4).map((image, index) => (
                                        <Grid item xs={3} key={index}>
                                            <img src={image} alt={`Apartment image ${index + 1}`} style={{ width: '100%', borderRadius: '8px' }} />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                    אזור: {apartment.area.name}, עיר: {apartment.city}
                                </Typography>
                                <Typography variant="body2">{apartment.description}</Typography>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>?מה עוד אצלנו</Typography>
                                {apartment.more.map((m, i) => (
                                    <Typography key={i} variant="body2">{m}</Typography>
                                ))}
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>מיטות</Typography>
                                <Typography variant="body2">{apartment.numbeds} מיטות</Typography>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>מחיר</Typography>
                                <Typography variant="body2">{apartment.price} ללילה</Typography>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>טלפון</Typography>
                                <Typography variant="body2">{apartment.advertiser.phone}</Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};
