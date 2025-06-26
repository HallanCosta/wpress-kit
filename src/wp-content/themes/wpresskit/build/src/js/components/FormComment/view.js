import Regex from "@root/utils/Regex";

export default class FormCommentView {
  form = document.querySelector('#form-comment');
  
  authorName = this.form.querySelector('#authorName');
  authorWebsite = this.form.querySelector('#authorWebsite');
  email = this.form.querySelector('#email');
  message = this.form.querySelector('#comment-msg-box');
  postId = this.form.querySelector('#postId');

  limit = 3;
  countCommentShow = this.limit;
  commentItems = [...document.querySelectorAll('.blog-details-comment')];
  btnLoadingComments = document.querySelector('#btn-loading-comments');

  // Dependencies
  formFieldValidation = null;

  constructor(props) {
    console.log('> FormCommentView');

    this.formFieldValidation = props.formFieldValidation;

    // Mostrar os 3 primeios comentários
    this.showComments(this.limit);

    // Botão de carregar comentários
    this.btnLoadingCommentsOnClick();
  }

  showComments(hiddenOnly) {
    this.commentItems.map(function(commentItem, index) {
      if (index >= hiddenOnly) commentItem.classList.add('hidden');
    }.bind(this));
  }

  btnLoadingCommentsOnClick() {
    if (this.commentItems.length <= this.limit) {
      this.btnLoadingComments.classList.add('hidden');
    }

    this.btnLoadingComments.addEventListener('click', function(e) {
      this.countCommentShow += this.limit;

      this.commentItems.map(function(commentItem, index) {
        if (commentItem.classList.contains('hidden') && index < this.countCommentShow) {
          commentItem.classList.remove('hidden');
        } 

        // Carregado todos os elementos
        if (this.countCommentShow >= this.commentItems.length) {
          this.btnLoadingComments.remove();
        }
      }.bind(this));
    }.bind(this));
  }

  cleanForm() {
    this.authorName.value = '';
    this.authorWebsite.value = '';
    this.email.value = '';
    this.message.value = '';
  }

  handleForm(onSubmitForm) {
    this.form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const validations = [
        this.formFieldValidation.isValidRegex({ element: this.authorName, message: 'Insira um nome e sobrenome', regex: Regex.fullname }),
        this.formFieldValidation.isValidRegex({ element: this.authorWebsite, message: 'Insira o link de uma rede social ou portfólio com "https"', regex: Regex.https }),
        this.formFieldValidation.isValidRegex({ element: this.email, message: 'Insira um email válido', regex: Regex.email }),
        this.formFieldValidation.isValidLenght({ element: this.message, min: 8, max: 2048, message: 'Insira no mínimo 8 caracteres' }),
      ];

      if (validations.includes(false)) {
        return false;
      }

      const formData = new FormData(this.form);
      onSubmitForm(formData);
    }); 
  }
}