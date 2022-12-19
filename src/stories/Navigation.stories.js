import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Navigation from '../components/Navigation';
import store from '../states/index';

const stories = {
  title: 'Navigation',
  component: Navigation,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Provider store={store}>
          <Story />
        </Provider>
      </BrowserRouter>
    ),
  ],
};

export default stories;

function WithTypeNotLoggedIn() {
  return <Navigation />;
}

export { WithTypeNotLoggedIn };
