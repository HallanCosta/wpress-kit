import FormValidation, { ERROR } from "./validation";

import FormView from "./view";
import FormController from "./controller";

export default class FormContact {
  viewProps = null;
  controller = null;

  constructor(props) {
    console.log('> Form');

    this.viewProps = props.view;
    this.controllerProps = props.controller;
  }

  run() {
    const formValidation = new FormValidation({
      typeError: ERROR.field
    });

    const formView = new FormView({
      formValidation,
      ...this.viewProps
    });

    const formController = new FormController({
      formView,
      ...this.controllerProps
    });
  }
}