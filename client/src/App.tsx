import React from 'react';
import Home from './pages/Home';
import Nav from './components/layout/Nav';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Stats from './pages/Stats';
import Profile from './pages/Profile';
import { Layout } from './components/layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/stats' element={<Stats />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </Layout>
      <Nav />
    </Router>
  );
}

export default App;

// todo: scroll fixed (scroll to top)
// todo: show months after seeded
// todo: seeded loading
// todo: add form
// todo: no expenses graphs
// todo: seed/ clear separate loading
// todo: replace momentjs with https://date-fns.org/v2.16.1/docs/Getting-Started
// todo: replace forms with react-hook-form
// todo: tests
// todo: change adapter
