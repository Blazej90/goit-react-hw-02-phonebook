import React, { useState } from 'react';
import { nanoid } from 'nanoid';

import styles from './App.module.css';

export const App = () => {
  const [state, setState] = useState({
    contacts: [],
    name: '',
  });

  const handleNameChange = event => {
    const regex = /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŹŻ' -]+$/;
    const inputValue = event.target.value;
    if (regex.test(inputValue) || inputValue === '') {
      setState(prevState => ({
        ...prevState,
        name: inputValue,
      }));
    }
  };

  const handleAddContact = () => {
    if (state.name.trim() !== '') {
      const newContact = {
        id: nanoid(),
        name: state.name,
      };

      setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
        name: '',
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
          onChange={handleNameChange}
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
              {contact.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
