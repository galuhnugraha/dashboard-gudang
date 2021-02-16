import React from 'react';
import {Store} from "../store";
import {useLocalStore} from "mobx-react-lite";
import Cookies from 'universal-cookie';

var cookie = new Cookies();

const storeContext = React.createContext(null);
export const store = new Store(cookie.get('Token'));

export const StoreProvider = ({ children }) => {
  const localStore = useLocalStore(() => {
    return store;
  });
  return <storeContext.Provider value={localStore}>{children}</storeContext.Provider>
};
export const useStore = () => {
  const store = React.useContext(storeContext);
  if (!store) {
    // this is especially useful in TypeScript so you don't need to be checking for null all the time
    throw new Error('useStore must be used within a StoreProvider.');
  }
  return store;
};