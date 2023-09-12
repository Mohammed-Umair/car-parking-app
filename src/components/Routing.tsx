import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Parking from "./Parking";
import ParkingLot from "./ParkingLot";
import Context from "./Context";
import PaymentPage from "./PaymentPage";
const Routing = () => {
  return (
    <div>
      <Context>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Parking />} />
            <Route path="/parkinglot" element={<ParkingLot />} />
            <Route
              path="/paymentPage"
              element={<PaymentPage />}
            />
          </Routes>
        </BrowserRouter>
      </Context>
    </div>
  );
};

export default Routing;
