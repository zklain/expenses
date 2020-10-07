import React, { useContext } from 'react';
import { Box, Button, Text, Flex, IconButton } from 'theme-ui';
import { ExpansesForm } from './AddExpenseForm';
import { GrClose } from 'react-icons/gr';
import { FaPlusCircle } from 'react-icons/fa';
import { AddExpenseContext } from './AddExpenseContext';

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
      <Box
        onClick={() => setFormOpen(!formOpen)}
        sx={{
          bottom: '5rem',
          right: [3],
          position: 'fixed',
          display: 'flex',
          color: 'purple',
          borderRadius: '12px',
          borderWidth: 0,
          fontWeight: 400,
          cursor: 'pointer',
          borderImage: 'none',
          transition: 'all 0.1s ease-in-out',
          fontSize: [2],
          py: [2],
          px: [3],
          justifyContent: 'center',
          alignItems: 'center',
        }}
        as='button'>
        <Text sx={{ fontWeight: 600, zIndex: 9999, marginRight: 2 }} as='span'>
          Add Expense
        </Text>
        <FaPlusCircle />
      </Box>
    </Flex>
  );
};
