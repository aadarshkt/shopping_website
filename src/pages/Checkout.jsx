import React, { useEffect, useState } from "react";
import commerce from "../lib/commerce";

const Checkout = ({ onCaptureCheckout, cart }) => {
  const [checkoutState, setCheckoutState] = useState({
    checkoutToken: {},
    firstName: "Jane",
    lastName: "Doe",
    email: "janedoe@email.com",
    phoneNumber: 1234567890,
  });

  const [card, setCard] = useState({
    number: "",
    expiry_month: "",
    expiry_year: "",
    cvc: "",
  });

  const generateCheckoutToken = () => {
    if (cart.line_items.length) {
      commerce.checkout
        .generateToken(cart.id, { type: "cart" })
        .then((token) => {
          setCheckoutState.checkoutToken(token);
        })
        .catch((error) => {
          console.log("There was an error in generating a token", error);
        });
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setCheckoutState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCaputure = (e) => {
    e.preventDefault();

    const orderData = {
      line_items: sanitizedLineItems(cart.line_items),
      customer: {
        firstname: checkoutState.firstName,
        lastname: checkoutState.lastName,
        email: checkoutState.email,
        phoneNumber: checkoutState.phoneNumber,
      },
      payment: {
        gateway: "test_gateway",
        card: {
          number: card.number,
          expiry_month: card.expiry_month,
          expiry_year: card.expiry_year,
          cvc: card.cvc,
        },
      },
    };

    onCaptureCheckout(checkoutState.checkoutToken.id, orderData)
  };

  const sanitizedLineItems = (lineItems) => {
    return lineItems.reduce((data, lineItem) => {
      const item = data;
      let variantData = null;
      if (lineItem.selected_options.length) {
        variantData = {
          [lineItem.selected_options[0].group_id]:
            lineItem.selected_options[0].option_id,
        };
      }
      item[lineItem.id] = {
        quantity: lineItem.quantity,
        variants: variantData,
      };
      return item;
    }, {});
  };

  useEffect(() => {
    generateCheckoutToken();
  }, []);

  return (
    <div>
      <form autoComplete="off">
        <h4 className="text-white font-light">Student information</h4>
        <label>First Name</label>
        <input
          name="firstName"
          value={checkoutState.firstName}
          onChange={handleChange}
        ></input>

        <label>Last Name</label>
        <input
          name="lastName"
          value={checkoutState.lastName}
          onChange={handleChange}
        ></input>

        <label>Email</label>
        <input
          name="email"
          value={checkoutState.email}
          type="email"
          onChange={handleChange}
        ></input>

        <label>Phone Number</label>
        <input
          name="phoneNumber"
          value={checkoutState.phoneNumber}
          type="tel"
          onChange={handleChange}
        ></input>

        <button onClick={handleCaputure}>Confirm Order</button>
      </form>
    </div>
  );
};

export default Checkout;
