import { useState, useContext, useEffect } from 'react';
import StoreProvider from '../context/provider'

/**
 * use effect for connection with store.
 *
 * @param {object} initialState - object initial state
 * @param {object} paths - object of path-alias
 * @param {function} conditionCache - cache function
 *
 * @return {array} [state, function] - state of store and function dispatch
 */
function useStore(initialState = {}, paths = {}, conditionCache) {
  const link = {};
  const { store } = useContext(StoreProvider);
  const stateFromStore = store.getStateByPath(paths);

  Object.keys(stateFromStore).forEach(key => stateFromStore[key] === undefined && delete stateFromStore[key]);

  const combinedState = {...initialState, ...stateFromStore};
  const [ state, setState ] = useState(combinedState);

  useEffect(() => {
    store.subscribe(paths, link, conditionCache, (state) => {
      setState(state);
    });

    return () => {
      store.unsubscribe(link);
    };
  }, []);

  return [ state, store.dispatch.bind(store) ];
}

export default useStore;
