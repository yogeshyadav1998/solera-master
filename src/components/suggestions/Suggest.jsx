import React from "react";
import { render } from "react-dom";
import axios from 'axios';

import Singledruginput from "../singledruginput/singledruginput";
import Prescriptioninput from "../prescription_section/prescription";

function SuggestedInput() {

  return (
    <div>
      <Singledruginput/>
      <Prescriptioninput/>
    </div>
  );
}
export default SuggestedInput;