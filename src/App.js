import React from 'react';
import { AuctionBody } from './components/auctions/Body';
import {NavComp} from './components/auth/NavComp';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <NavComp />
      <AuctionBody />
    </AuthProvider>
  )
}

export default App;
