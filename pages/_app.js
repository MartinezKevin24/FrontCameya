import '../styles/globals.css'
import storefn from "../store";
import {Provider} from "react-redux";
import {persistStore} from "redux-persist";
import { PersistGate } from 'redux-persist/integration/react'

function MyApp({ Component, pageProps }) {

  const store = storefn();
  const persist = persistStore(store)

  return (
      <Provider store={store}>
          <PersistGate persistor={persist}>
              <Component {...pageProps} />
          </PersistGate>
      </Provider>
  )
}

export default MyApp
