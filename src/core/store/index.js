import get from 'lodash/get';
import set from 'lodash/set';

/**
 * Execute handler callback for provide new state to subscribers.
 *
 * @return {void}
 */
function privateExecuteNextSubscribes() {
  this.nextSubscribers.map((sub) => {
    const isCache = typeof sub.conditionCache === 'function' ?
      sub.conditionCache :
      () => false;

    if (!isCache(sub.prevState, sub.state)) {
      sub.handler(this.getStateByPath(sub.paths));
    }
  });
  this.nextSubscribers = [];

  console.log('store::privateExecuteNextSubscribes');
}

export default class Store {
  constructor(initialState = {}) {
    this.store = initialState;
    this.subscribers = [];
    this.nextSubscribers = [];
    this.subscriberId = undefined;
  }

  /**
   * Add subscriber to pull.
   *
   * @param {object} paths - object of path-alias
   * @param {object} link - link to object for identify subscriber
   * @param {object} conditionCache - object of alias and condition cache function
   * @param {function} handler - function handler calls every times if user call dispatch
   *
   * @return {void}
   */
  subscribe(paths, link, conditionCache, handler) {
    this.subscribers.push({
      paths,
      link,
      conditionCache,
      handler,
      prevState: undefined,
      state: undefined
    });
  }

  /**
   * Remove subscriber from pull.
   *
   * @param {object} link - link to object for identify subscriber
   *
   * @return {void}
   */
  unsubscribe(link) {
    const subIndex = this.subscribers.findIndex((sub) => sub.link === link);

    if (subIndex !== -1) {
      this.subscribers.splice(subIndex, 1);
    }
  }

  /**
   * Will did changes in state and call handler for all subscribers by paths.
   *
   * @param {string} path - path to property in store
   * @param {function} handler - function handler for will do changes in store
   *
   * @return {void}
   */
  dispatch(path, handler) {
    const subs = this.subscribers.filter((sub) => sub.paths[path] !== undefined);
    const prevState = get(this.store, path, undefined);
    const state = handler(prevState);

    this.store = set(this.store, path, state);

    subs.forEach((sub) => {
      const index = this.nextSubscribers.findIndex((nSub) => nSub.link === sub.link);

      if (index === -1) {
        sub.prevState = prevState;
        sub.state = state;
        this.nextSubscribers.push(sub);
      }
    });

    console.log('store::dispatch', path);

    clearTimeout(this.subscriberId);
    this.subscriberId = setTimeout(() => {
      privateExecuteNextSubscribes.apply(this);
    }, 0);
  }

  /**
   * Get state by paths.
   *
   * @param {object} paths - object of path-alias
   *
   * @return {object} state - state
   */
  getStateByPath(paths) {
    let state = {};

    Object.keys(paths).forEach((path) => {
      const alias = paths[path];

      state[alias] = get(this.store, path, undefined);
    });

    return state;
  }
}
