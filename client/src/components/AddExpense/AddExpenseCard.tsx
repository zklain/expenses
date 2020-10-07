import React, { useContext } from 'react';
import { Box, Button, Flex, IconButton } from 'theme-ui';
import { ExpansesForm } from './AddExpenseForm';
import { GrClose } from 'react-icons/gr';
import { AddExpenseContext } from './AddExpenseContext';
import { AnimatePresence, motion } from 'framer-motion';

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
        borderRadius: '30px 30px 0 0',
        py: [4],
        '&.closed': {
          transform: 'translate3d(0, 0%, 0)',
        },
        '&.opened': {
          transform: 'translate3d(0, -100%, 0)',
        },
      }}
      className={open ? 'opened' : 'closed'}>
      <Box px={4} pt={3}>
        <Box sx={{ position: 'absolute', top: [3], right: [3] }}>
          <IconButton onClick={() => setOpen(false)}>
            <GrClose style={{ width: 24, height: 24 }} />
          </IconButton>
        </Box>

        <ExpansesForm setOpen={setOpen} open={open} />
      </Box>
    </Box>
  );
};

export const AddExpense = () => {
  // const [formOpen, setFormOpen] = useState(false);

  const { formOpen, setFormOpen } = useContext(AddExpenseContext);

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
          color: 'text',
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
