import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  // our price is in whole numbers but stripe is based on cents
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51HnRv6KEfb0WHbpqWD9vm1nlzAwLZ1Zs2fRHvSn6OUUJgbiFfVp8eZIGjpuP6EqI0B01rDk28G2RzV0Vg1gzL5B1005zB1xlY0";

  const onToken = (token) => {
    //with the token we would pass this to our back end which then creates the charge payment
    // but because we arent making a backend yet we're going to just alert the payment
    console.log(token);
    alert("Payment Successful");
  };

  //this component is from Stripe and it takes a lot of props
  // as you can see from this link https://github.com/azmenak/react-stripe-checkout

  return (
    <StripeCheckout
      label="Pay Now"
      name="Ecommerce Website"
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
  //token is the on success callback that is triggered when we submit
};

export default StripeCheckoutButton;
