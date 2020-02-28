import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StoreProvider from '../context/provider'

class Provider extends Component {
  render() {
    const { store, children } = this.props;

    return (
      <StoreProvider.Provider
        value={{
          store
        }}
      >
        {children}
      </StoreProvider.Provider>
    );
  }
}

Provider.propTypes = {
  store: PropTypes.object.isRequired
};

export default Provider;
