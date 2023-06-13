import '../styles/globals.css'
import "react-datepicker/dist/react-datepicker.css";
import store from "../store";
import {Provider} from "react-redux";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import Layout from 'components/Layout'

let persistor = persistStore(store);

function MyApp({ Component, pageProps }) {

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID_KEY}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  )
}

export default MyApp
