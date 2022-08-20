import React from 'react';

import {StrictMode} from 'react';  /// new version from react-render from react-dom is considered legacy
import {createRoot} from 'react-dom/client'; //replaced react-render


import { BrowserRouter } from 'react-router-dom';

import App from './App';


import { UserProvider } from './contexts/user.context';
import { CategoriesProvider } from './contexts/categories.context';
import { CartProvider } from './contexts/cart.context';

import './index.scss';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CategoriesProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </CategoriesProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
);
