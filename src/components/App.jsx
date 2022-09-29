import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Section } from './Section/Section';
import { PhonebookForm } from './PhonebookForm/PhonebookForm';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';
import { Spinner } from './Spinner/Spinner';
import { filter } from 'redux/contacts/contactsSlice';
import {
  selectContacts,
  selectFilterName,
  selectErrorMessage,
  selectLoading,
  selectVisibleContacts,
} from 'redux/contacts/selectors';
import {
  fetchContacts,
  addNewContact,
  deleteContact,
} from 'redux/contacts/operations';
import { Message } from './Message/Message';

export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const name = useSelector(selectFilterName);
  const loading = useSelector(selectLoading);
  const messageError = useSelector(selectErrorMessage);
  const visibleContacts = useSelector(selectVisibleContacts);

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

  return (
    <>
      <Section title="Phonebook">
        <PhonebookForm
          onAddContact={addContact}
          onReviewName={reviewNameInContacts}
        />
        <Spinner loading={loading} size={'56'} />
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
