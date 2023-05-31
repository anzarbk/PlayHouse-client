import React from 'react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import PaypalCheckoutButtons from '../../utils/PaypalCheckoutButtons';
const initialOptions = {
  'client-id': import.meta.env.VITE_PAYPAL_CLIENT_ID,
  currency: 'INR',
  intent: 'capture',
  'data-client-token': 'abc123xyz==',
};

function Paypal() {
  return (
    <div>
      <PayPalScriptProvider options={initialOptions}>
        <PaypalCheckoutButtons />
      </PayPalScriptProvider>
      {/* <h1>paypal</h1> */}
    </div>
  );
}

export default Paypal;
