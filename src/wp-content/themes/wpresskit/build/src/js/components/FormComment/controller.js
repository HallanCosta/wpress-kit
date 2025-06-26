import Alert from "@root/utils/Alert";

export default class FormCommentController {
  formCommentView = null;

  constructor(props) {
    console.log('> FormCommentController');
    this.formCommentView = props.formCommentView;

    this.formCommentView.handleForm(this.onSubmitForm.bind(this));
  }

  async onSubmitForm(formData) {
    try {
      const baseURL = window.origin;

      Alert({
        title: 'Enviando os dados...',
        color: 'gray'
      });

      const response = await fetch(`${baseURL}/wp-json/comment/register`, {
        method: 'POST',
        body: formData,
      });
    
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
      }

      Alert({
        title: 'Comentário enviado com sucesso',
        color: "success"
      });

      this.formCommentView.cleanForm();
    
      await response.json();
      return response.ok;
    } catch (error) {
      Alert({
        title: 'Ocorreu um erro, por favor entre em contato conosco!',
        color: "error"
      });
    }
  }
}