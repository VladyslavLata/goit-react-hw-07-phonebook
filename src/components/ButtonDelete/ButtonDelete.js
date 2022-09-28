import { useState } from 'react';
import { Button } from './ButtonDelete.styled';
import { Spinner } from 'components/Spinner/Spinner';

export const ButtonDelete = ({ onRemoveContact, id, children }) => {
  const [loadingg, setLoadingg] = useState(false);

  return (
    <Button
      type="button"
      disabled={loadingg}
      onClick={() => {
        setLoadingg(true);
        onRemoveContact(id);
      }}
    >
      <Spinner loading={loadingg} />
      {children}
    </Button>
  );
};
