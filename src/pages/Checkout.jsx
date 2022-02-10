import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import commerce from "../lib/commerce";

const Checkout = ({ cart }) => {

  let navigate = useNavigate();
  const [checkoutState, setCheckoutState] = useState({
    firstName: "Jane",
    lastName: "Doe",
    email: "janedoe@email.com",
    phoneNumber: 1234567890,
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setCheckoutState((prevState) => ({ ...prevState, [name]: value }));
  };

  const encode = (data) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
  }

  const handleSubmit = (e) => {
    console.log(e);
    console.
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "Order Data", ...checkoutState })
    })
      .then(() => alert("Success!"))
      .catch(error => alert(error));

    e.preventDefault();
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gradient-to-r from-yellow-500 via-purple-500 to-pink-500 ">
      <div className="flex flex-col w-full justify-center items-center ">
        <h1 className="flex font-extrabold font-poppins text-white text-4xl m-12">
          Checkout
        </h1>
        <form
          name="Order Data"
          autoComplete="off"
          className="flex flex-col bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-4/12"
          onSubmit={handleSubmit}
          data-netlify="true"
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

          <button
            className="font-poppins mt-5 ml-8 mr-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={navigate("/")}
          >
            Confirm Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
