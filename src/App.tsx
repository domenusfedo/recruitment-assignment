import React from 'react';

import {
  AppHolder,
  Holder,
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
