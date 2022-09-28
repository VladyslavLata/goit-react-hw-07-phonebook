import PropTypes from 'prop-types';
import { Box } from 'components/Box/Box';
import { Number } from './Contacts.styled';
import { ButtonDelete } from 'components/ButtonDelete/ButtonDelete';

export const Contacts = ({ contacts, onRemoveContact }) => {
  return (
    <Box as="ul" py={4}>
      {contacts.map(({ name, phone, id }) => (
        <Box
          as="li"
          p={3}
          display="flex"
          width="300px"
          justifyContent="space-between"
          alignItems="center"
          key={id}
        >
          <div>
            <h3>{name}</h3>
            <Number>{phone}</Number>
          </div>
          <ButtonDelete onRemoveContact={onRemoveContact} id={id}>
            Delete
          </ButtonDelete>
        </Box>
      ))}
    </Box>
  );
};

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  onRemoveContact: PropTypes.func.isRequired,
};
