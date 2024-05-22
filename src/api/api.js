import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

export async function apiGetAllContacts() {
  const resp = await axios.get("/api/contacts/");
  return resp.data;
}

export async function apiGetContactById(id) {
  const resp = await axios.get(`/api/contacts/${id}`);
  return resp.data;
}

export async function apiAddContact(contact) {
  const resp = await axios.post("/api/contacts/", contact);
  return resp.data;
}

export async function apiDeleteContact(id) {
  const resp = await axios.delete(`/api/contacts/${id}`);
  return resp.data;
}

export async function apiUpdateContact(id, updateContact) {
  const resp = await axios.put(`/api/contacts/${id}`, updateContact);
  return resp.data;
}

export async function apiUpdateStatusFavoriteContact(id) {
  const resp = await axios.patch(`/api/contacts/${id}/favorite`);
  return resp.data;
}
