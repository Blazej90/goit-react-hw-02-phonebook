import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

import styles from './App.module.css';

const App = () => {
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

  const handleNameChange = event => {
    const { name, value } = event.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleNumberChange = event => {
    const { name, value } = event.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddContact = () => {
    const isNameExist = state.contacts.some(
      contact => contact.name.toLowerCase() === state.name.toLowerCase()
    );

    if (isNameExist) {
      alert(`${state.name} is already in contacts!`);
    } else {
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

  const handleDeleteContact = id => {
    setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
      filter: prevState.filter,
    }));
  };

  const handleFilterChange = event => {
    const filterValue = event.target.value.toLowerCase();
    setState(prevState => ({ ...prevState, filter: filterValue }));
  };

  const filteredContacts = state.contacts.filter(contact =>
    contact.name.toLowerCase().includes(state.filter)
  );

  return (
    <div className={styles.appContainer}>
      <h1 className={styles.pageTitle}>Phonebook</h1>
      <ContactForm
        name={state.name}
        number={state.number}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleAddContact={handleAddContact}
      />
      <h2 className={styles.contactsHeading}>Contacts</h2>
      <Filter filter={state.filter} handleFilterChange={handleFilterChange} />
      <ContactList
        contacts={state.filter ? filteredContacts : state.contacts}
        handleDeleteContact={handleDeleteContact}
      />
    </div>
  );
};

export { App };
