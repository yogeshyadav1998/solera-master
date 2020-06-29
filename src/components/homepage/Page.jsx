import React from "react";
import Singledruginput from "../singledruginput/singledruginput";
import Prescriptioninput from "../prescription_section/prescription";


function Page() {
   return(<div className="page">
      <h1 className="title">Stop paying too much for your prescriptions</h1>
      <h4 className="title2">Compare prices, find FREE coupons, and save up to 80%</h4>
      <Singledruginput/>
      <Prescriptioninput/>
   </div> 
   );
}
export default Page;