import axios from "axios";

axios.defaults.baseURL =
  "https://66291db854afcabd07383da3.mockapi.io/api/contacts";

export async function getContacts() {
  const resp = await axios.get("/contact");
  return resp.data;
}

export async function addContact(contact: {}) {
  const result = await axios.post("/contact", contact);
  return result.data;
}

export async function deleteContact(id: number) {
  const result = await axios.delete(`/contact/${id}`);
  return result.data;
}
