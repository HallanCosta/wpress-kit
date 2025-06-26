// Estrutura para funciona
//
// input.name
// span.message-error
// 
// Campo message-error precisa estar logo abaixo do input text

import Alert from "@root/utils/Alert";

export const ERROR = {
  alert: 1,
  field: 2
};

export default class FormFieldValidation {
  typeError = null;

  constructor(props) {
    console.log('> FormFieldValidation')

    this.typeError = props.typeError
  }

  setErrorField(element, message = '* campo obrigatório') {
    const parentElement = element.parentNode;
    const messageErrorElement = parentElement.querySelector('.message-error');

    parentElement.classList.add('error');
    messageErrorElement.classList.remove('hidden');
    messageErrorElement.innerText = message;
  }

  setCorrectField(element) {
    const parentElement = element.parentNode;
    const messageErrorElement = parentElement.querySelector('.message-error');

    parentElement.classList.remove('error');
    messageErrorElement.classList.add('hidden');
  }

  isValidRegex({
    element,
    message = '',
    regex = null,
  }) {
    const isValid = !regex.test(element.value) ? false : element.value;

    if (!isValid) {
      this.typeError === ERROR.alert ? ( 
        Alert({
          title: message,
          color: "error"
        })
      ) : null;

      this.typeError === ERROR.field ? this.setErrorField(element, message) : null;
      return false;
    }

    this.typeError === ERROR.field ? this.setCorrectField(element) : null;
    return true;
  }

  isSelected({
    element,
    message = '',
  }) {
    const isValid = element.value != '' ? true : false;

    if (!isValid) {
      this.typeError === ERROR.alert ? ( 
        Alert({
          title: message,
          color: "error"
        })
      ) : null;

      this.typeError === ERROR.field ? this.setErrorField(element, message) : null;
      return false;
    }

    this.typeError === ERROR.field ? this.setCorrectField(element) : null;
    return true;
  }

  isValidLenght({
    element,
    message = '',
    min,
    max = 9999,
  }) {
    const length = element.value.length;
    const isValid = length >= min && length <= max;

    if (!isValid) {
      this.typeError === ERROR.alert ? ( 
        Alert({
          title: message,
          color: "error"
        })
      ) : null;

      this.typeError === ERROR.field ? this.setErrorField(element, message) : null;
      return false;
    }

    this.typeError === ERROR.field ? this.setCorrectField(element) : null;
    return true;
  }
  
  isValidTerm({
    element,
    message = '',
  }) {
    const isAccept = element.checked;

    if (!isAccept) {
      this.typeError === ERROR.alert ? ( 
        Alert({
          title: message,
          color: "error"
        })
      ) : null;

      this.typeError === ERROR.field ? this.setErrorField(element, message) : null;
      return false;
    }

    this.typeError === ERROR.field ? this.setCorrectField(element) : null;
    return isAccept;
  }
}