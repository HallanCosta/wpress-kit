import FormComment from '@root/components/FormComment';

import SinglePostView from './view';

export default class SinglePost {
  constructor() {}

  run() {
    console.log('> SinglePost');

    const formComment = new FormComment();
    formComment.run();

    const singlePostView = new SinglePostView();
    singlePostView.run();
  }
}