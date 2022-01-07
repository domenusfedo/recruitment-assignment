import React from 'react';

import {
  AppHolder,
  Holder,
  SearchIcon
} from './App.elements';

import { 
  Search, 
} from './components/index'

const App = () => {

  return (
   <AppHolder>
     <Holder>
        <Search/>
      </Holder>
   </AppHolder>
  );
}

export default App;
