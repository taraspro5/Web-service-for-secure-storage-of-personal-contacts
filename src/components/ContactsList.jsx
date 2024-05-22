import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchContacts,
  updateContact,
  deleteContact,
  updateContactStatusFavorite,
} from "../redux/contactsOperation";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogContentText,
  DialogActions,
  Button,
  FormControlLabel,
  Checkbox,
  IconButton,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

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

export const ContactsList = () => {
  const dispatch = useDispatch();
  const { items, isLoading, error } = useSelector((state) => state.contacts);
  const [selectedContact, setSelectedContact] = useState(null);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [filter, setFilter] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleContactClick = (contact) => {
    console.log(contact);
    if (!contact) return;

    setSelectedContact(contact);
    setFormValues({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedContact(null);
    setIsEditing(false);
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSave = async (values) => {
    const updatedContact = {
      id: selectedContact._id,
      name: values.name,
      email: values.email,
      phone: values.phone,
    };
    dispatch(updateContact(updatedContact));
    handleClose();
  };

  const handleDelete = () => {
    console.log(selectedContact._id);
    dispatch(deleteContact(selectedContact._id));
    handleClose();
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredItems = items
    .filter((contact) => contact.phone.includes(filter))
    .filter((contact) => (showFavorites ? contact.favorite : true));

  const handleFavoriteToggle = (contact) => {
    const updatedFavorite = {
      id: contact._id,
      favorite: contact.favorite,
    };
    console.log(updatedFavorite);
    dispatch(updateContactStatusFavorite(updatedFavorite));
  };

  const handleShowFavoritesContacts = () => {
    setShowFavorites((prev) => !prev);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" variant="body2">
        Blad odczytanie kontaktow
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 4,
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Twoje kontakty
      </Typography>
      {filteredItems.length > 0 ? (
        <>
          <Box sx={{ width: "100%", maxWidth: 600, mb: 2 }}>
            <TextField
              label="Poszukiwanie za numerem telefonu"
              variant="outlined"
              value={filter}
              onChange={handleFilterChange}
              fullWidth
              margin="normal"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={showFavorites}
                  onChange={handleShowFavoritesContacts}
                />
              }
              label="Pokaż tylko ulubione"
            />
          </Box>
          <List sx={{ width: "100%", maxWidth: 600 }}>
            {filteredItems.map((contact) => (
              <ListItem
                button
                key={contact._id}
                onClick={() => handleContactClick(contact)}
              >
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center">
                      <PhoneInput
                        country={"ua"}
                        value={contact.phone}
                        inputProps={{ readOnly: true }}
                        buttonStyle={{ pointerEvents: "none" }}
                        containerStyle={{ width: "auto" }}
                        inputStyle={{
                          border: "none",
                          backgroundColor: "transparent",
                          pointerEvents: "none",
                        }}
                      />
                    </Box>
                  }
                  secondary={`Imie: ${contact.name} | Email: ${contact.email}`}
                />
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavoriteToggle(contact);
                  }}
                >
                  {contact.favorite ? (
                    <FavoriteIcon color="error" />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </IconButton>
              </ListItem>
            ))}
          </List>
        </>
      ) : showFavorites ? (
        <>
          <FormControlLabel
            control={
              <Checkbox
                checked={showFavorites}
                onChange={handleShowFavoritesContacts}
              />
            }
            label="Pokaż tylko ulubione"
          />
          <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
            Jeszcze nie masz ulubionych kontaktow 😢
          </Typography>
        </>
      ) : (
        <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
          Jeszcze nie masz kontaktow 😢
        </Typography>
      )}
      {selectedContact && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            {isEditing ? "Edytuj kontakt" : "Informacje o kontakcie"}
          </DialogTitle>
          <DialogContent>
            {isEditing ? (
              <Formik
                initialValues={{
                  name: selectedContact.name,
                  email: selectedContact.email,
                  phone: selectedContact.phone,
                }}
                validationSchema={ContactSchema}
                onSubmit={handleSave}
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
                      value={selectedContact.phone}
                      onChange={(phone) => setFieldValue("phone", phone)}
                      inputStyle={{ width: "100%" }}
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      style={{ color: "red" }}
                    />
                    <DialogActions>
                      <Button
                        type="submit"
                        color="primary"
                        disabled={isSubmitting}
                      >
                        Zapisz
                      </Button>
                      <Button onClick={handleClose} color="primary">
                        Zamknij
                      </Button>
                    </DialogActions>
                  </Form>
                )}
              </Formik>
            ) : (
              <>
                <DialogContentText>
                  <strong>Imię:</strong> {selectedContact.name}
                </DialogContentText>
                <DialogContentText>
                  <strong>Email:</strong> {selectedContact.email}
                </DialogContentText>
                <DialogContentText>
                  <strong>Telefon:</strong> {selectedContact.phone}
                </DialogContentText>
              </>
            )}
          </DialogContent>
          <DialogActions>
            {!isEditing && (
              <>
                <Button onClick={handleEditToggle} color="primary">
                  Zmien dane
                </Button>
                <Button onClick={handleDelete} color="secondary">
                  Usunac kontakt
                </Button>
                <Button onClick={handleClose} color="primary">
                  Zamknij
                </Button>
              </>
            )}
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};
