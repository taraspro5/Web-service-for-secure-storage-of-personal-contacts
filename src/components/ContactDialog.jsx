import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import PhoneInput from "react-phone-input-2";
import * as Yup from "yup";

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

export const ContactDialog = ({
  open,
  onClose,
  isEditing,
  contact,
  formValues,
  setFormValues,
  onSave,
  onDelete,
  onEditToggle,
}) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>
      {isEditing ? "Edytuj kontakt" : "Informacje o kontakcie"}
    </DialogTitle>
    <DialogContent>
      {isEditing ? (
        <Formik
          initialValues={formValues}
          validationSchema={ContactSchema}
          onSubmit={onSave}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <Field
                as={TextField}
                name="name"
                label="Imie"
                fullWidth
                margin="dense"
              />
              <ErrorMessage
                name="name"
                component="div"
                style={{ color: "red" }}
              />
              <Field
                as={TextField}
                name="email"
                label="Email"
                type="email"
                fullWidth
                margin="dense"
              />
              <ErrorMessage
                name="email"
                component="div"
                style={{ color: "red" }}
              />
              <PhoneInput
                country={"ua"}
                value={formValues.phone}
                onChange={(phone) => setFieldValue("phone", phone)}
                inputStyle={{ width: "100%" }}
              />
              <ErrorMessage
                name="phone"
                component="div"
                style={{ color: "red" }}
              />
              <DialogActions>
                <Button type="submit" color="primary" disabled={isSubmitting}>
                  Zapisz
                </Button>
                <Button onClick={onClose} color="primary">
                  Zamknij
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      ) : (
        <>
          <DialogContentText>
            <strong>Imię:</strong> {contact.name}
          </DialogContentText>
          <DialogContentText>
            <strong>Email:</strong> {contact.email}
          </DialogContentText>
          <DialogContentText>
            <strong>Telefon:</strong> {contact.phone}
          </DialogContentText>
        </>
      )}
    </DialogContent>
    <DialogActions>
      {!isEditing && (
        <>
          <Button onClick={onEditToggle} color="primary">
            Zmien dane
          </Button>
          <Button onClick={onDelete} color="secondary">
            Usunac kontakt
          </Button>
          <Button onClick={onClose} color="primary">
            Zamknij
          </Button>
        </>
      )}
    </DialogActions>
  </Dialog>
);
