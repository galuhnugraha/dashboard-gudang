import React from "react";
import {observer} from 'mobx-react-lite';
import {useStore} from "../../utils/useStores";

export const Login = observer(() => {
  const store = useStore();

  return <>
    <span>login gan {store.testObs}</span>
    <button onClick={() => {
      store.setTestObs();
    }}>ini</button>
  </>;
});
