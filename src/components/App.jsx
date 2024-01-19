import React, { useState } from 'react';
import { nanoid } from 'nanoid';

import styles from './App.module.css';

export const App = () => {
  const initialContacts = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];

  const [state, setState] = useState({
    contacts: [...initialContacts],
    filter: '',
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

  const handleFilterChange = event => {
    const filterValue = event.target.value.toLowerCase();
    setState(prevState => ({
      ...prevState,
      filter: filterValue,
    }));
  };

  const filteredContacts = state.contacts.filter(contact =>
    contact.name.toLowerCase().includes(state.filter)
  );

  const displayedContacts = state.filter ? filteredContacts : state.contacts;

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
        <p>Find contacts by name</p>
        <input
          type="text"
          name="filter"
          value={state.filter}
          onChange={handleFilterChange}
          className={styles.input}
        />
        <ul className={styles.contactList}>
          {displayedContacts.map(contact => (
            <li key={contact.id} className={styles.contactItem}>
              {contact.name} - {contact.number}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
