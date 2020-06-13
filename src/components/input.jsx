import React from "react";

function Input() {
  
 return(
      <div className="inputsearch">
          <input type="text" placeholder="Type a drug name (like Atorvastin,Sildenafil,etc)"></input>
          <button className="search" type="submit" onClick={this.myfuction}>FIND THE LOWEST PRICES</button>
      </div> 
   );
}
export default Input;