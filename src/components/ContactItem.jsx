import React from "react";
import { ListItem, ListItemText, Box, IconButton } from "@mui/material";
import PhoneInput from "react-phone-input-2";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export const ContactItem = ({ contact, onClick, onFavoriteToggle }) => (
  <ListItem button onClick={() => onClick(contact)}>
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
      secondary={`Imię: ${contact.name} | Email: ${contact.email}`}
    />
    <IconButton
      onClick={(e) => {
        e.stopPropagation();
        onFavoriteToggle(contact);
      }}
    >
      {contact.favorite ? (
        <FavoriteIcon color="error" />
      ) : (
        <FavoriteBorderIcon />
      )}
    </IconButton>
  </ListItem>
);
