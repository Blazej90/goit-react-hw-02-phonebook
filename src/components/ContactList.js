import React from 'react';
import ContactItem from './ContactItem';

const ContactList = ({ contacts }) => {
  return (
    <ul>
      {contacts.map(contact => (
        <ContactItem key={contact.id} contact={contact} />
      ))}
    </ul>
  );
};

export default ContactList;
