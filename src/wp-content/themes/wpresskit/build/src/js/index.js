import 'animate.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import "../scss/style.scss";

import $ from 'jquery';
import 'bootstrap';
import 'owl.carousel';

import Routes from "./routes/index";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

$(document).ready(function() {
  console.log('Ready > jQuery > $');

  const header = new Header();
  header.run();
  
  const routes = new Routes({
    page: $$page
  });
  routes.run();

  const footer = new Footer();
  footer.run();
});