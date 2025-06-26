import FormFieldValidation, { ERROR } from "@root/utils/FormFieldValidation";

import FormCommentView from "./view";
import FormCommentController from "./controller";

export default class FormComment {
  constructor() {
    console.log('> FormComment');
  }

  run() {
    const formFieldValidation = new FormFieldValidation({
      typeError: ERROR.field
    });
    const formCommentView = new FormCommentView({
      formFieldValidation,
    });
    const formCommentController = new FormCommentController({
      formCommentView
    });
  }
}