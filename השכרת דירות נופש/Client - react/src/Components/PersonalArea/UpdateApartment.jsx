import React, { useEffect, useState, Fragment } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem, InputLabel, FormControl, Select } from '@mui/material';
import { Formik, Field, Form } from 'formik';
import { getAllAreas } from '../../Api/areaService';
import { getAllCategories } from '../../Api/categoryService';

const UpdateApartmentDialog = ({ open, onClose, apartmentData, onUpdate }) => {

    const handleSubmit = async (values) => {
        try {
            await onUpdate(values);
            onClose();
        } catch (error) {
            console.error("Error updating apartment:", error);
        }
    };

    return <Fragment>
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>עדכון דירה</DialogTitle>
            <Formik
                initialValues={{
                    name: apartmentData.name || '',
                    description: apartmentData.description || '',
                    price: apartmentData.price || '',
                    city: apartmentData.city || '',
                    numbeds: apartmentData.numbeds || '',
                    // category: apartmentData.category.name || '',
                    // area: apartmentData.area.name || '',
                    // images: apartmentData.images || [],
                }}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue }) => (
                    <Form>
                        <DialogContent>
                            <Field
                                name="name"
                                label="שם"
                                variant="outlined"
                                fullWidth
                                as={TextField}
                                margin="normal"
                            />
                            <Field
                                name="description"
                                label="תאור"
                                variant="outlined"
                                fullWidth
                                as={TextField}
                                margin="normal"
                            />
                            <Field
                                name="price"
                                label="מחיר"
                                variant="outlined"
                                fullWidth
                                as={TextField}
                                margin="normal"
                                type="number"
                            />
                           
                            <Field
                                name="city"
                                label="עיר"
                                variant="outlined"
                                fullWidth
                                as={TextField}
                                margin="normal"
                            />
                            <Field
                                name="numbeds"
                                label="מספר מיטות"
                                variant="outlined"
                                fullWidth
                                as={TextField}
                                margin="normal"
                                type="number"
                            />

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={onClose} color="primary">
                                ביטול
                            </Button>
                            <Button type="submit" color="primary">
                                שמור
                            </Button>
                        </DialogActions>
                    </Form>
                )}
            </Formik>
        </Dialog>
    </Fragment>
};

export default UpdateApartmentDialog;
