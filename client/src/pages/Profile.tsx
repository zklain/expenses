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
import Container from '../components/layout/Container';
import Card from '../components/layout/Card';
import { ThemeVariant } from '../styles/ThemeContext';

export default () => {
  const { clearExpanses, seedDb, loading } = useContext(DatabaseContext);
  const [colorMode, setColorMode] = useColorMode<ThemeVariant>('light');
  return (
    <>
      <Header>
        <Heading variant='headerHeading'>Profile</Heading>
      </Header>
      <main>
        <Container mt={6}>
          <Card mb={4}>
            <Box>
              <Heading mb={3}>Database</Heading>
            </Box>
            <Flex sx={{ alignItems: 'flex-star' }} mb={3}>
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
                onClick={clearExpanses}>
                {loading ? (
                  'Workin...'
                ) : (
                  <>
                    <span role='img'>🔥</span> Clear DB
                  </>
                )}
              </Button>
            </Flex>
          </Card>
          <Card py={3}>
            <Box mb={3}>
              <Heading>Personalization</Heading>
            </Box>
            <Flex
              sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <Label>Color Mode</Label>
              <Label>
                <Radio
                  name='dark-mode'
                  value='dark'
                  onClick={() => setColorMode('dark')}
                  defaultChecked={colorMode === 'dark'}
                />
                Dark
              </Label>
              <Label>
                <Radio
                  name='light-mode'
                  value='light'
                  onClick={() => setColorMode('light')}
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
        </Container>
      </main>
    </>
  );
};

// TODO: confirm modal for clearDB
