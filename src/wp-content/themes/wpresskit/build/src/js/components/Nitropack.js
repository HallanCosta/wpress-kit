export default class Nitropack {
  constructor() {
    console.log('> Nitropack');
  }

  run() {
    this._removeWatermark();
  }

  _removeWatermark() {
    let space = '';
    for (let i = 0; i < 50; i++) {
      const selector = `div[style="display:${space}block${space}!important;${space}clear:${space}both${space}!important"]`;
      const element = document.querySelector(selector);
      if (element) {
        element.remove();
        break;
      }
      space += ' ';
    }
  }
}