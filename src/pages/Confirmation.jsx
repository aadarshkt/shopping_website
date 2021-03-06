import React from "react";
import { Link } from "react-router-dom";

const Confirmation = ({ order, onBackToHome }) => {
  if (!order) {
    return null;
  }

  return (
    <div>
      <div>
        <h4>
          Thank you for your purchase, {order.customer.firstname}{" "}
          {order.customer.lastname}!
        </h4>
        <p className="confirmation__wrapper-reference">
          <span>Order ref:</span> {order.customer_reference}
        </p>
      </div>
      <Link
        className="confirmation__wrapper-back"
        type="button"
        to="/"
        onClick={onBackToHome}
      >
        <span>Back to home</span>
      </Link>
    </div>
  );
};

export default Confirmation;
