import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ContainerForma, Label } from './ContactForm.styled';

const ContactForm = ({ saveData }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const onChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  };
  const onSubmit = e => {
    e.preventDefault();
    if (saveData({ name, number })) {
      return;
    }

    setName('');
    setNumber('');
  };

  return (
    <ContainerForma onSubmit={onSubmit}>
      <Label htmlFor="">
        Name
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={onChange}
        />
      </Label>
      <Label htmlFor="">
        Number
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={onChange}
        />
      </Label>
      <button type="submit" onSubmit={onSubmit}>
        Add contact
      </button>
    </ContainerForma>
  );
};

export default ContactForm;

ContactForm.propTypes = {
  saveData: PropTypes.func.isRequired,
};
