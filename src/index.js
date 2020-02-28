import React from 'react';
import { render } from 'react-dom';
import App from './containers/app';
import Store from './core/store';
import Provider from './core/provider';

const rootElement = document.getElementById('root');

const store = new Store({
  comments: {
    content: ['init comment'],
    length: 1,
    title: 'comments',
    form: {
      add: {
        input: '',
        placeholder: 'enter name of new comment'
      }
    }
  },
});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
