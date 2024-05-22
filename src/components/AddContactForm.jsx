import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../redux/contactsOperation";
import { useNavigate } from "react-router-dom";

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Imie musi miec co najmniej 2 symbola")
    .required("Pole obowiązkowe"),
  email: Yup.string()
    .email("Nieprawidłowy adres e-mail")
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Nieprawidłowy adres e-mail"
    )
    .required("Pole obowiązkowe"),
  phone: Yup.string()
    .matches(/^\+?[1-9]\d{1,14}$/, "Nieprawidlowy numer telefonu")
    .required("Pole obowiązkowe"),
});

export const AddContactForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    console.log(values);
    console.log(isContactInBook);
    console.log(contactsPhones);
    if (isContactInBook) {
      alert(`${values.phone} juz masz w kontaktach`);
    } else {
      // const result = await dispatch(addContact(values));
      // console.log(result);
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
        {({ errors, touched, isSubmitting }) => (
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
            <Field
              as={TextField}
              name="phone"
              type="text"
              label="Telefon*"
              fullWidth
              error={touched.phone && !!errors.phone}
              helperText={touched.phone && errors.phone}
              margin="normal"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              disabled={isSubmitting}
            >
              Dodac nowy kontakt
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
