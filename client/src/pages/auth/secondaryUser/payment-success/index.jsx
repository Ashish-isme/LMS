import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
  const [search] = useSearchParams();
  const dataQuery = search.get("data");

  return <div>Payment Done</div>;
};

export default PaymentSuccess;
