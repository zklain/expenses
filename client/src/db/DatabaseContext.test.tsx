import React from 'react';
import { DatabaseContext, DatabaseProvider } from './DatabaseContext';
import { render, cleanup } from '@testing-library/react';

describe('DatabaseContext', () => {
  afterEach(cleanup);
  // TODO: mock db
  xit('sets db', () => {
    const TestComponent = () => {
      const { db, loading, ofMonths } = React.useContext(DatabaseContext);
      return (
        <div>
          <div data-testid='loading'>{loading.toString()}</div>
          <div data-testid='ofMonths'>{ofMonths}</div>
          <div data-testid='loading'>{loading.toString()}</div>
        </div>
      );
    };
    const {} = render(
      <DatabaseProvider>
        <TestComponent />
      </DatabaseProvider>
    );
  });

  xit('sets loading', () => {});

  xit('sets number ofMonths', () => {});
});
