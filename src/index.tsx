import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { ThemeProvider } from 'styled-components';

import {Provider} from 'react-redux';
import {store} from './app/store';

import {GlobalStyle} from './theme/GlobalStyle';
import {theme} from './theme/theme';

//require('dotenv').config();

ReactDOM.render(
  <>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </Provider>
  </>,
  document.getElementById('root')
);
