import Alert from "@root/utils/Alert";
import { apiUrl } from "@root/utils/Endpoints";

export default class FormController {
  // Dependences 
  formView = null;

  // Attributes
  endpoint = null;

  constructor(props) {
    console.log('> FormController');
    this.formView = props.formView;
    this.endpoint = props.endpoint;

    this.formView.handleForm(this.onSubmitForm.bind(this));
  }

  async onSubmitForm(formData) {
    try {
      Alert({
        title: 'Enviando os dados...',
        color: 'gray'
      });

      const response = await fetch(`${apiUrl}/${this.endpoint}`, {
        method: 'POST',
        body: formData,
      });
    
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
      }

      Alert({
        title: 'Formulário enviado com sucesso',
        color: "success"
      });

      this.formView.cleanForm();
    
      const data = await response.json();
      return response.ok;
    } catch (error) {
      Alert({
        title: 'Ocorreu um erro, por favor entre em contato conosco!',
        color: "error"
      });
    }
  }
}