import HomeView from './view';

import REGEX from '@root/utils/Regex';

import Form from '@root/components/Form';

export default class Home {
  constructor() {}

  run() {
    console.log('> Home');

    const formSelector = document.querySelector('#form-contact');
    const name = formSelector.querySelector('input[name="name"]');
    const email = formSelector.querySelector('input[name="email"]');
    const whatsapp = formSelector.querySelector('input[name="whatsapp"]');
    const cnpj = formSelector.querySelector('input[name="cnpj"]');
    const state = formSelector.querySelector('select[name="state"]');
    const zipcode = formSelector.querySelector('input[name="zipcode"]');
    const message = formSelector.querySelector('textarea[name="message"]');
    const policy = formSelector.querySelector('#policy');

    const form = new Form({
      view: {
        form: formSelector,
        fields: [
          { validationType: 'regex', element: name, message: 'Insira um nome e sobrenome', regex: REGEX.fullname },
          { validationType: 'regex', element: email, message: 'Insira um email válido',regex: REGEX.email },
          { validationType: 'regex', element: whatsapp, message: 'Insira um número de whatsapp válido', regex: REGEX.whatsapp },
          { validationType: 'regex', element: cnpj, message: 'Insira um CNPJ válido', regex: REGEX.cnpj },
          { validationType: 'selected', element: state, message: 'Selecione um estado' },
          { validationType: 'length', element: zipcode, min: 9, max: 9, message: 'Insira um CEP válido' },
          { validationType: 'length', element: message, min: 8, max: 2048, message: 'Insira no mínimo 8 caracteres' },
          { validationType: 'checked', element: policy, message: 'Você precisa aceitar os termos de política de privacidade' }
        ],
        policyField: $('.checkbox[for="policy"]')
      },
      controller: {
        endpoint: 'wpresskit/v1/form/contact'
      }
    });
    form.run();

    const homeView = new HomeView();
    homeView.run();
  }
}