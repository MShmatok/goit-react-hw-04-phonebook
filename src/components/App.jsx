import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

import { Container, Title, SubTitle } from './App.styled';
import { nanoid } from 'nanoid';

const useLocalStorage = (key, defValue) => {
  const [state, setState] = useState(() => {
    return JSON.parse(window.localStorage.getItem(key)) ?? defValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, window.JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
};

const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useLocalStorage('filter', '');

  const saveData = data => {
    let isDuplicate = contacts.find(elem => {
      return elem.name.toLowerCase() === data.name.toLowerCase();
    });
    if (isDuplicate) {
      alert(`${data.name} is alredy in contacts!`);
      return true;
    }
    setContacts(prevState => {
      return [...prevState, { id: nanoid(), ...data }];
    });
  };

  const setFilters = e => {
    const { value } = e.target;
    setFilter(value);
  };

  const handleDelete = id => {
    setContacts(prevState => {
      return prevState.filter(item => item.id !== id);
    });
  };

  return (
    <Container>
      <Title>Phonebook</Title>
      <ContactForm saveData={saveData} />

      <SubTitle>Contacts</SubTitle>
      <Filter filterText={filter} onFilter={setFilters} />
      <ContactList
        contacts={contacts}
        filterText={filter}
        onDelete={handleDelete}
      />
    </Container>
  );
};

export { App };
