export default class OwlCarousel {
  constructor() {}
  
  run() {
    console.log('> Owl Carousel');

    $('.wpresskit-custom-owl-carousel').owlCarousel({
      loop:true,
      margin:10,
      nav:true,
      responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:5
        }
      }
    });
  }
}
