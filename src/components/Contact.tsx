import { getContacts, addContact, deleteContact } from "../api";

export const Contact = () => {
  console.log(getContacts());
  const result = getContacts();
  return (
    <div>
      <ul></ul>
    </div>
  );
};
