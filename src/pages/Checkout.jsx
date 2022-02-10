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
        gateway: "gway_L5zgq89qAP7rlA",
        card: {
          number: card.number,
          expiry_month: card.expiry_month,
          expiry_year: card.expiry_year,
          cvc: card.cvc,
        },
      },
    };

    console.log(orderData);

    onCaptureCheckout(checkoutState.checkoutToken.id, orderData);
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
    <div className="flex h-screen justify-center items-center bg-gradient-to-r from-yellow-500 via-purple-500 to-pink-500 ">
      <div className="flex flex-col w-full justify-center items-center ">
        <h1 className="flex font-extrabold font-poppins text-white text-4xl m-12">
          Checkout
        </h1>
        <form
          autoComplete="off"
          className="flex flex-col bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-4/12"
          onSubmit={handleCaputure}
        >
          <label
            className="font-poppins block text-gray-700 text-sm font-bold mt-3 mb-1"
            for="username"
          >
            First Name
          </label>
          <input
            name="firstName"
            value={checkoutState.firstName}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></input>

          <label
            className="font-poppins block text-gray-700 text-sm font-bold mt-3 mb-1"
            for="username"
          >
            Last Name
          </label>
          <input
            name="lastName"
            value={checkoutState.lastName}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></input>

          <label
            className="font-poppins block text-gray-700 text-sm font-bold mt-3 mb-1"
            for="username"
          >
            Email
          </label>
          <input
            name="email"
            value={checkoutState.email}
            type="email"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></input>

          <label
            className="font-poppins block text-gray-700 text-sm font-bold mt-3 mb-1"
            for="username"
          >
            Phone Number
          </label>
          <input
            name="phoneNumber"
            value={checkoutState.phoneNumber}
            type="tel"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></input>

          <label
            className="font-poppins block text-gray-700 text-sm font-bold mt-3 mb-1"
            for="username"
          >
            Card Expiry Month
          </label>

          <input
            name="expiryMonth"
            value={card.expiry_month}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></input>

          <label
            className="font-poppins block text-gray-700 text-sm font-bold mt-3 mb-1"
            for="username"
          >
            Card Expiry Year
          </label>
          <input
            name="expiryYear"
            value={card.expiry_year}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></input>

          <label
            className="font-poppins block text-gray-700 text-sm font-bold mt-3 mb-1"
            for="username"
          >
            CVV
          </label>
          <input
            name="cvc"
            value={card.cvc}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></input>

          <button
            className="font-poppins mt-5 ml-8 mr-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Confirm Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
