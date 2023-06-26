import '../styles/globals.css'
import "react-datepicker/dist/react-datepicker.css";
import store from "../store";
import {Provider} from "react-redux";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { RecoilRoot } from 'recoil';
import Layout from 'components/Layout'
import 'react-toastify/dist/ReactToastify.min.css'
import {ToastContainer} from 'react-toastify'

let persistor = persistStore(store);

function MyApp({ Component, pageProps }) {

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID_KEY}>
      <RecoilRoot>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <Layout>
              <Component {...pageProps} />
              <ToastContainer/>
            </Layout>
          </PersistGate>
        </Provider>
      </RecoilRoot>
    </GoogleOAuthProvider>
  )
}

export default MyApp
