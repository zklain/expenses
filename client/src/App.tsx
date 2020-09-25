import React from 'react';
import Home from './pages/Home';
import Nav from './components/layout/Nav';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Stats from './pages/Stats';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/stats' element={<Stats />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
        <Nav />
      </div>
    </Router>
  );
}

export default App;

// todo: tests
// todo: replace rebass with theme-ui (can't apply global theme!)
// todo: replace momentjs with https://date-fns.org/v2.16.1/docs/Getting-Started
