import IMask from 'imask';

export default class FormMask {
  constructor() {
    console.log('> FormMask');
  }

  _maskCellphone(v) {
    var len = 0;
  
    v = v.replace(/\D/g, "");
    v = v.replace(/\-/g, "");
    v = v.replace(/\./g, "");
  
    len = v.length;
  
    v = v.replace(/^(\d\d)(\d)/g, "($1) $2");
  
    if (len > 10) {
      v = v.replace(/(\d{5})(\d)/, "$1-$2").slice(0, 15);
    } else {
      v = v.replace(/(\d{4})(\d)/, "$1-$2").slice(0, 14);
    }
  
    return v;
  }

  _maskCellphoneTarget(e) {
    e.target.value = this._maskCellphone(e.target.value);
  }

  cellphone(element) {
    element.addEventListener('input', this._maskCellphoneTarget.bind(this))
    element.addEventListener('keyup', this._maskCellphoneTarget.bind(this))
  }

  cnpj(input) {
    const maskOptions = {
        mask: '00.000.000/0000-00'
    };
    const masked = IMask(input, maskOptions);
    input.masked = masked;
  }

  zipcode(input) {
    const maskOptions = {
      mask: '00000-000'
    };
    const masked = IMask(input, maskOptions);
    input.masked = masked;
  }
}
