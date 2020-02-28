import React from 'react';
import StoreProvider from '../context/provider'


function Connect(Component, paths) {
  class ConnectComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    componentDidMount() {
      const { store } = this.context;

      store.subscribe(paths, this, (state) => {
        this.updateState(state);
      });

      this.updateState(store.getStateByPath(paths));
    }

    componentWillUnmount() {
      const { store } = this.context;

      store.unsubscribe(this);
    }

    render() {
      const { store } = this.context;
      const newProps = {...this.props, ...this.state};

      return (<Component {...newProps} dispatch={store.dispatch.bind(store)} />);
    }

    updateState(state) {
      this.setState(state);
    }
  }

  ConnectComponent.contextType = StoreProvider;

  return ConnectComponent;
}

export default Connect;
