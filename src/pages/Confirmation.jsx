import React from "react";
import { Link } from "react-router-dom";

const Confirmation = ({}) => {

  return (
    <div>
      <div>
        <h4>
          Thank you for your purchase
        </h4>
        <p className="confirmation__wrapper-reference">
        </p>
      </div>
      <Link
        className="confirmation__wrapper-back"
        type="button"
        to="/"
      >
        <span>Back to home</span>
      </Link>
    </div>
  );
};

export default Confirmation;
