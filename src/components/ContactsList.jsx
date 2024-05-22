import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../redux/contactsOperation";
import { useNavigate } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";

export const ContactsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, isLoading, error } = useSelector((state) => state.contacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleContactClick = (contactId) => {
    navigate(`/${contactId}`);
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
      <List sx={{ width: "100%", maxWidth: 600 }}>
        {items.map((contact) => (
          <ListItem
            button
            key={contact.id}
            onClick={() => handleContactClick(contact.id)}
          >
            <ListItemText
              primary={contact.phone}
              secondary={`Imie: ${contact.name} | Email: ${contact.email}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
