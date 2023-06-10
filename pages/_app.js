import '../styles/globals.css'
import storefn from "../store";
import {Provider} from "react-redux";
import {persistStore} from "redux-persist";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { PersistGate } from 'redux-persist/integration/react'

function MyApp({ Component, pageProps }) {

  const store = storefn();
  const persist = persistStore(store)

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID_KEY}>
      <Provider store={store}>
        <PersistGate persistor={persist}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  )
}

export default MyApp
