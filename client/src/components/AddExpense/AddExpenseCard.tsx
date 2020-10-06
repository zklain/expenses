import React from 'react';
import { useEffect, useState } from 'react';
import { Box, Button, Flex, IconButton } from 'theme-ui';
import { ExpansesForm } from './AddExpenseForm';
import { GrClose } from 'react-icons/gr';

export const ExpansesFormCard = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: any;
}) => {
  return (
    <Box
      sx={{
        zIndex: 2,
        backgroundColor: 'background',
        boxShadow: '0 1px 3px grey',
        transition: 'all 0.3s ease-in-out',
        width: '100%',
        position: 'fixed',
        borderRadius: '30px',
        paddingBottom: '50px',
        '&.closed': {
          // bottom: '-500px',
          transform: 'translate3d(0, 0%, 0)',
        },
        '&.opened': {
          // bottom: '20px',
          transform: 'translate3d(0, -90%, 0)',
          // transform: 'scaleY(1)',
          // marginTop: 0,
        },
      }}
      className={open ? 'opened' : 'closed'}>
      <Box px={4} pt={3}>
        <IconButton variant='close' onClick={() => setOpen(false)}>
          <GrClose />
        </IconButton>
        <ExpansesForm setOpen={setOpen} open={open} />
      </Box>
    </Box>
  );
};

export const AddExpense = () => {
  const [formOpen, setFormOpen] = useState(false);

  // todo: button in navbar

  useEffect(() => {
    if (formOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [formOpen]);

  return (
    <Flex
      sx={{
        width: '100%',
        textAlign: 'center',
        justifyContent: 'center',
      }}>
      <ExpansesFormCard open={formOpen} setOpen={setFormOpen} />
      <Button
        onClick={() => setFormOpen(!formOpen)}
        sx={{
          bottom: '4rem',
          right: '2rem',
          position: 'fixed',
          display: formOpen ? 'none' : 'block',
          backgroundColor: 'green',
          color: '#000',
          padding: '0',
          borderRadius: '50%',
          borderWidth: 0,
          borderColor: 'grey',
          height: '4rem',
          width: '4rem',
          fontSize: '2rem',
          fontWeight: 400,
          cursor: 'pointer',
          borderImage: 'none',
          boxShadow: '0 1px 6px grey',
          transition: 'all 0.1s ease-in-out',
          zIndex: 9999,
          '&:hover': {
            boxShadow: '0 0px 3px grey',
          },
        }}
        type='button'>
        +
      </Button>
    </Flex>
  );
};
