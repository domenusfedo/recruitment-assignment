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
  const [toggleSearch, toggleSearchSet] = React.useState<boolean>(false)

  return (
   <AppHolder>
     <Holder>
        <SearchIcon onClick={() =>toggleSearchSet(!toggleSearch)}/>
        {toggleSearch && <Search toggleSearchSet={toggleSearchSet}/>}
      </Holder>
   </AppHolder>
  );
}

export default App;
