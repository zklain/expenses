import React, { useState, useContext, useEffect, useRef } from 'react';
import { Formik, FormikHelpers } from 'formik';
import { Button, Box, Flex, Label, Input, Select } from 'theme-ui';
import { categoryIconsMap } from '../Expense/CategoryIcon';
import { DatabaseContext } from '../../db/DatabaseContext';

interface ISubmitExpanse {
  name?: string;
  category?: string;
  amount: number;
}

export const ExpansesForm = ({ setOpen, open }: any) => {
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

// todo: framer motion
