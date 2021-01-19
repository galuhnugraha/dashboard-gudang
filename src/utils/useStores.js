import React from 'react';
import {Store} from "../store";
import {useLocalStore} from "mobx-react-lite";

const storeContext = React.createContext(null);
const store = new Store();

export const StoreProvider = ({ children }) => {
  const localStore = useLocalStore(() => {
    console.log(store);
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
