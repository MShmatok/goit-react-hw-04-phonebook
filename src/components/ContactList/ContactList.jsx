import PropTypes from 'prop-types';
import ContactItem from 'components/ContactItem/ContactItem';

const ContactList = ({ contacts, onDelete }) => {
  return (
    <ul>
      {contacts.map(item => (
        <ContactItem
          key={item.id}
          contact={item}
          onDelete={() => onDelete(item.id)}
        />
      ))}
    </ul>
  );
};

export default ContactList;
ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};
