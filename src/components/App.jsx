import React, { useState } from 'react';
import { nanoid } from 'nanoid';

import styles from './App.module.css';

export const App = () => {
  const [state, setState] = useState({
    contacts: [],
    name: '',
    number: '',
  });

  const handleInputChange = event => {
    const { name, value } = event.target;

    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddContact = () => {
    if (state.name.trim() !== '' && state.number.trim() !== '') {
      const newContact = {
        id: nanoid(),
        name: state.name,
        number: state.number,
      };

      setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
        name: '',
        number: '',
      }));
    }
  };

  return (
    <div className={styles.appContainer}>
      <h1 className={styles.pageTitle}>Phonebook</h1>
      <p className={styles.name}>Name</p>
      <label className={styles.labelName}>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Ząćęłńóśźż' -]+$"
          title="Name may contain only letters, apostrophe, dash, spaces, and Polish characters (ą, ę, ł, ó, ś, ż, ź, ć, ń)"
          required
          value={state.name}
          onChange={handleInputChange}
          className={styles.input}
        />
      </label>
      <p className={styles.name}>Phone Number</p>
      <label className={styles.labelNumber}>
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={state.number}
          onChange={handleInputChange}
          className={styles.input}
        />
      </label>

      <button onClick={handleAddContact} className={styles.addContactBtn}>
        Add contact
      </button>

      <div>
        <h2 className={styles.contactsHeading}>Contacts</h2>
        <ul className={styles.contactList}>
          {state.contacts.map(contact => (
            <li key={contact.id} className={styles.contactItem}>
              {contact.name} - {contact.number}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
