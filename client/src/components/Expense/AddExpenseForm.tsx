import React, { useState, useContext, useEffect, useRef } from 'react';
import { Formik, FormikHelpers } from 'formik';
import { Button, Box, Flex, Label, Input, Select } from 'theme-ui';
import { categoryIconsMap } from './CategoryIcon';
import { DatabaseContext } from '../../db/DatabaseContext';

interface ISubmitExpanse {
  name?: string;
  category?: string;
  amount: number;
}

const ExpansesForm = ({ setOpen, open }: any) => {
  const { addExpanse } = useContext(DatabaseContext);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open === true) {
      //@ts-ignore
      inputRef.current.focus();
    }
  }, [open]);

  const handleSubmit = async (
    values: ISubmitExpanse,
    { setSubmitting }: FormikHelpers<ISubmitExpanse>
  ) => {
    setSubmitting(true);

    const { name, category, amount } = values;

    if (!amount) return;

    await addExpanse({
      amount,
      category,
      name,
    });
    setSubmitting(false);
    setOpen(false);
  };

  return (
    <Formik
      initialValues={{ name: '', amount: 1.1, category: 'drinks' }}
      validate={({ name, amount, category }) => {
        let errors = {};
        if (!amount) {
          errors = { amount: 'Amount pleeeese...' };
        }

        if (amount === 0) {
          errors = { amount: '0? I donno mate.' };
        }
        return errors;
      }}
      // @ts-ignore
      onSubmit={handleSubmit}>
      {({ values, handleChange, handleSubmit }) => (
        <form action='submit' onSubmit={handleSubmit}>
          <Flex mx={3} sx={{ flexDirection: 'column' }}>
            <Box px={4} py={2}>
              <Label htmlFor='amount'>Amount</Label>
              <Input
                ref={inputRef}
                required
                value={values.amount}
                onChange={handleChange}
                type='number'
                name='amount'
                step='.01'
              />
            </Box>
            <Box px={4} py={2}>
              <Label htmlFor='name'>Name</Label>
              <Input
                onChange={handleChange}
                value={values.name}
                placeholder='name'
                type='text'
                name='name'
              />
            </Box>
            <Box px={4} py={2}>
              <Label htmlFor='name'>Category</Label>
              <Select
                required
                onChange={handleChange}
                value={values.category}
                placeholder='category'
                name='category'>
                {Object.keys(categoryIconsMap).map((keyVal: string, index) => (
                  <option key={index} value={keyVal}>
                    {
                      // @ts-ignore
                      categoryIconsMap[keyVal]
                    }{' '}
                    {keyVal}
                  </option>
                ))}
              </Select>
            </Box>
            <Box>
              <Button variant='green' type='submit'>
                Add
              </Button>
            </Box>
          </Flex>
        </form>
      )}
    </Formik>
  );
};

const ExpansesFormCard = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: any;
}) => {
  return (
    <Box variant='formCard' className={open ? 'opened' : 'closed'}>
      <Box px={4} pt={3}>
        <Button variant='close' onClick={() => setOpen(false)}>
          X
        </Button>
        <ExpansesForm setOpen={setOpen} open={open} />
      </Box>
    </Box>
  );
};

export default () => {
  const [formOpen, setFormOpen] = useState(false);

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
