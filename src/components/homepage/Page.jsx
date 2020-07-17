import React from "react";
import Singledruginput from "../singledruginput/singledruginput";
import Prescriptioninput from "../prescription_section/prescription";
import Brandcompared from '../brandcompared/brandcompared';
import { useTranslation } from 'react-i18next';
import './page.css';

function Page() {
   
   const { t } = useTranslation();

   return(
   <div className="page">
      <h1 className="title">{t('title.1')}</h1>
      <h4 className="title2">{t('title.2')}</h4>
      <Singledruginput/>
      <Brandcompared/>
      {/* <Prescriptioninput/> */}
   </div> 
   );
}
export default Page;