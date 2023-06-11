import '../styles/globals.css'
import store from "../store";
import {Provider} from "react-redux";
import { GoogleOAuthProvider } from '@react-oauth/google';

function MyApp({ Component, pageProps }) {

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID_KEY}>
      <Provider store={store}>
          <Component {...pageProps} />
      </Provider>
    </GoogleOAuthProvider>
  )
}

export default MyApp
