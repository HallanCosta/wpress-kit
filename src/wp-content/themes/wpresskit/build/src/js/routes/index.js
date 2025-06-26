import Home from '@root/pages/Home';
import SinglePost from '@root/pages/SinglePost';
import PostModule from '@root/admin/Post';

class Routes {
  page = null; // Frontend
  typenow = null; // CMS
  
  constructor(props) {
    this.page = props.page;
    this.typenow = props.typenow;
  }

  run() {
    console.log('Routes CMS:', this.typenow);
    console.log('Routes Frontend:', this.page);

    switch (this.typenow ?? this.page) {
      case "home":
        const home = new Home();
        home.run();
        break;
      case "noticia":
        const singlePost = new SinglePost();
        singlePost.run();
        break;

      // Admin - CMS
      case "post": 
        const postModule = new PostModule();
        postModule.run();
        break;

      default:
        console.log('> Route frontend and cms not founded');
    }
  }
}

export default Routes;