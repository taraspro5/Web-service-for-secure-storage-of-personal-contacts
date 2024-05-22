import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../redux/contactsOperation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Imie musi miec co najmniej 2 symbola")
    .required("Pole obowiązkowe"),
  email: Yup.string()
    .email("Nieprawidłowy adres e-mail")
    .matches(
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Nieprawidłowy adres e-mail"
    )
    .required("Pole obowiązkowe"),
  phone: Yup.string()
    .matches(/^\+?[1-9]\d{1,14}$/, "Nieprawidlowy numer telefonu")
    .required("Pole obowiązkowe"),
});

export const AddContactForm = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.contacts.error);
  const contactsPhones = useSelector((state) => state.contacts.items);

  const initialValues = { name: "", email: "", phone: "" };

  const handleSubmit = async (
    values,
    { setSubmitting, setFieldError, resetForm }
  ) => {
    const isContactInBook = contactsPhones.find(
      (contact) => contact.phone === values.phone
    );
    if (isContactInBook) {
      alert(`${values.phone} juz masz w kontaktach`);
    } else {
      await dispatch(addContact(values));
    }
    setSubmitting(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 4,
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={ContactSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting, setFieldValue }) => (
          <Form style={{ width: "100%", maxWidth: 360 }}>
            {error === "Rejected" && (
              <Typography color="error" variant="body2">
                Blad dodawanie kontaktu
              </Typography>
            )}
            <Field
              as={TextField}
              name="name"
              type="text"
              label="Imie*"
              fullWidth
              error={touched.name && !!errors.name}
              helperText={touched.name && errors.name}
              margin="normal"
            />
            <Field
              as={TextField}
              name="email"
              type="email"
              label="Email*"
              fullWidth
              error={touched.email && !!errors.email}
              helperText={touched.email && errors.email}
              margin="normal"
            />
            <PhoneInput
              country={"ua"}
              value={initialValues.phone}
              onChange={(phone) => setFieldValue("phone", phone)}
              inputStyle={{ width: "100%" }}
            />
            {touched.phone && errors.phone && (
              <Typography color="error" variant="body2">
                {errors.phone}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              disabled={isSubmitting}
              sx={{ mt: 2 }}
            >
              Dodac nowy kontakt
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
