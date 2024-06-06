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
  Typography,
  Box,
  CircularProgress,
  TextField,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { ContactItem } from "./ContactItem";
import { ContactDialog } from "./ContactDialog";

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
  const [filterType, setFilterType] = useState("phone");
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleContactClick = (contact) => {
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

  const handleSave = (values) => {
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
    dispatch(deleteContact(selectedContact._id));
    handleClose();
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
  };

  const filteredItems = items
    .filter((contact) => {
      if (filterType === "name") {
        return contact.name.toLowerCase().includes(filter.toLowerCase());
      } else if (filterType === "email") {
        return contact.email.toLowerCase().includes(filter.toLowerCase());
      } else {
        return contact.phone.includes(filter);
      }
    })
    .filter((contact) => (showFavorites ? contact.favorite : true));

  const handleFavoriteToggle = (contact) => {
    const updatedFavorite = {
      id: contact._id,
      favorite: contact.favorite,
    };
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
      <Box sx={{ width: "100%", maxWidth: 600, mb: 2 }}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="filter-type-label">Typ filtracji</InputLabel>
          <Select
            labelId="filter-type-label"
            value={filterType}
            onChange={handleFilterTypeChange}
            label="Typ filtracji"
          >
            <MenuItem value="name">Imię</MenuItem>
            <MenuItem value="email">Email</MenuItem>
            <MenuItem value="phone">Telefon</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label={`Poszukiwanie za ${filterType}`}
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
      {filteredItems.length > 0 ? (
        <List sx={{ width: "100%", maxWidth: 600 }}>
          {filteredItems.map((contact) => (
            <ContactItem
              key={contact._id}
              contact={contact}
              onClick={handleContactClick}
              onFavoriteToggle={handleFavoriteToggle}
            />
          ))}
        </List>
      ) : showFavorites && filter.length > 0 ? (
        <Typography variant="body1" color="textSecondary" sx={{ mt: 2, mb: 4 }}>
          Nie znaleziono kontaktów za takim wyszukiwaniem 😢
        </Typography>
      ) : showFavorites ? (
        <Typography variant="body1" color="textSecondary" sx={{ mt: 2, mb: 4 }}>
          Jeszcze nie masz ulubionych kontaktow 😢
        </Typography>
      ) : filter.length > 0 ? (
        <Typography variant="body1" color="textSecondary" sx={{ mt: 2, mb: 4 }}>
          Nie znaleziono kontaktów za takim wyszukiwaniem 😢
        </Typography>
      ) : (
        <Typography variant="body1" color="textSecondary" sx={{ mt: 2, mb: 4 }}>
          Jeszcze nie masz kontaktow 😢
        </Typography>
      )}
      {selectedContact && (
        <ContactDialog
          open={open}
          onClose={handleClose}
          isEditing={isEditing}
          contact={selectedContact}
          formValues={formValues}
          setFormValues={setFormValues}
          onSave={handleSave}
          onDelete={handleDelete}
          onEditToggle={handleEditToggle}
        />
      )}
    </Box>
  );
};
