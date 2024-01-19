import React from 'react';

const ContactItem = ({ contact }) => {
  return (
    <li>
      {contact.name} - {contact.number}
    </li>
  );
};

export default ContactItem;
