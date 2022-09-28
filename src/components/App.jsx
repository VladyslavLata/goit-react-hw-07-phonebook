import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Section } from './Section/Section';
import { PhonebookForm } from './PhonebookForm/PhonebookForm';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';
import { filter } from 'redux/contacts/contactsSlice';
import {
  getContacts,
  getFilterName,
  getErrorMessage,
} from 'redux/contacts/selectors';
import {
  fetchContacts,
  addNewContact,
  deleteContact,
} from 'redux/contacts/operations';
import { Message } from './Message/Message';

export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const name = useSelector(getFilterName);
  const messageError = useSelector(getErrorMessage);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const reviewNameInContacts = name => {
    return contacts.find(contact => contact.name === name);
  };

  const addContact = contact => {
    dispatch(addNewContact(contact));
  };

  const removeContact = removeContactId => {
    dispatch(deleteContact(removeContactId));
  };

  const changeFilter = e => {
    dispatch(filter(e.currentTarget.value.trimStart()));
  };

  const getVisibleContacts = () => {
    const nameNormalized = name.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(nameNormalized)
    );
  };

  const visibleContacts = getVisibleContacts();
  return (
    <>
      <Section title="Phonebook">
        <PhonebookForm
          onAddContact={addContact}
          onReviewName={reviewNameInContacts}
        />
      </Section>
      <Section title="Contacts">
        <Filter
          filterHeader="Find contacts by name"
          value={name}
          onChange={changeFilter}
        />
        {messageError && <Message message={messageError} />}
        {visibleContacts.length > 0 && (
          <Contacts
            contacts={visibleContacts}
            onRemoveContact={removeContact}
          />
        )}
      </Section>
    </>
  );
};
