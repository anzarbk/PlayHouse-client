import { PayPalButtons } from '@paypal/react-paypal-js';
import { useState } from 'react';

const paypalCheckoutButton = (props) => {
  const { ticket } = props;
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);

  const handleApprove = async (orderId) => {
    //backend function
    //success
    setPaidFor(true);
    //navigate to the invoice
    //if error catch it
  };
  if (paidFor) {
    alert('thank you');
  }
  if (error) {
    alert('error');
  }

  return (
    <div>
      <PayPalButtons
        style={{
          color: 'silver',
          layout: 'horizontal',
          height: 48,
          tagline: false,
          shape: 'pill',
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: product.description,
                amount: {
                  value: product.price,
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
          handleApprove(data.orderID);
        }}
        onClick={(data, action) => {
          const hasAlreadyBoughtTicket = false;
          if (hasAlreadyBoughtTicket) {
            setError('you already buy');
          }
        }}
        onCancel={() => {
          //cancel message
        }}
        onError={(err) => {
          setError(err);
          console.log(err);
        }}
      />
    </div>
  );
};

export default paypalCheckoutButton;
