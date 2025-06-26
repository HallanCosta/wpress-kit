import WOW from 'wow.js';

import Nitropack from '@root/components/Nitropack';
import OwlCarousel from '@root/components/OwlCarousel';

import FormMask from '@root/utils/FormMask';

class Header {
  constructor() {}

  run() { 
    console.log('> Header'); 
    
    // Start the WOW.js to animations
    new WOW().init();

    const formMask = new FormMask;
    const zipcodesMask = [...document.querySelectorAll('.zipcode-mask')];
    zipcodesMask.map(zipcode => {
      formMask.zipcode(zipcode);  
    });

    const cellphonesMask = [...document.querySelectorAll('.cellphone-mask')];
    cellphonesMask.map(cellphone => {
      formMask.cellphone(cellphone);  
    });

    const cnpjMask = [...document.querySelectorAll('.cnpj-mask')];
    cnpjMask.map(cnpj => {
      formMask.cnpj(cnpj);  
    });

    //
    // Nitropack remove watermark
    const nitropack = new Nitropack();
    nitropack.run();

    //
    // OwlCarousel - all carousel website 
    const owlCarousel = new OwlCarousel();
    owlCarousel.run();
  }
}

export default Header;