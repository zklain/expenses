import React, { useContext } from 'react';
import {
  Box,
  Heading,
  Button,
  Text,
  Flex,
  useColorMode,
  Label,
  Radio,
} from 'theme-ui';
import Header from '../components/layout/Header';
import { DatabaseContext } from '../db/DatabaseContext';
import Card from '../components/layout/Card';
import { ThemeVariant } from '../styles/ThemeContext';
import { PageContent } from '../components/layout';

export default () => {
  const { clearExpanses, seedDb, loading } = useContext(DatabaseContext);
  const [colorMode, setColorMode] = useColorMode<ThemeVariant>('light');
  return (
    <>
      <Header>
        <Heading variant='headerHeading'>Profile</Heading>
      </Header>
      <PageContent>
        <Card mb={4} backgroundColor='backgroundLight'>
          <Box>
            <Heading mb={3}>Database</Heading>
          </Box>
          <Flex
            sx={{ alignItems: 'center', justifyContent: 'space-between' }}
            mb={3}>
            <Box>
              <Text>Seed the DB with test data.</Text>
            </Box>
            <Box>
              <Button variant='primary' disabled={loading} onClick={seedDb}>
                {loading ? 'Seeding DB...' : <>Seed DB</>}
              </Button>
            </Box>
          </Flex>

          <Flex
            sx={{ justifyContent: 'space-between', alignItems: 'center' }}
            mb={3}>
            <Text>Clear DB</Text>
            <Button
              disabled={loading}
              backgroundColor='purple'
              color='backgroundLight'
              onClick={clearExpanses}>
              {loading ? (
                'Workin...'
              ) : (
                <>
                  Clear DB
                  <span role='img' aria-label='Clear DB'>
                    🔥
                  </span>{' '}
                </>
              )}
            </Button>
          </Flex>
        </Card>
        <Card py={3} backgroundColor='backgroundLight'>
          <Box mb={3}>
            <Heading>Personalization</Heading>
          </Box>
          <Flex sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Label>Color Mode</Label>
            <Label sx={{ marginBottom: 0 }}>
              <Radio
                name='dark-mode'
                value='dark'
                onChange={() => setColorMode('dark')}
                checked={colorMode === 'dark'}
              />
              Dark
            </Label>
            <Label sx={{ marginBottom: 0 }}>
              <Radio
                name='light-mode'
                value='light'
                onChange={() => setColorMode('light')}
                checked={colorMode === 'light'}
              />
              Light
            </Label>

            {/* <Switch
                checked={colorMode === 'dark'}
                onClick={() =>
                  setColorMode(colorMode === 'dark' ? 'light' : 'dark')
                }
              /> */}
          </Flex>
        </Card>
      </PageContent>
    </>
  );
};

// TODO: confirm modal for clearDB
