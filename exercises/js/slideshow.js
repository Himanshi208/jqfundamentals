/*This is a tough one if you do not know JS basics and particularly scopes.

Open the file /exercises/index.html in your browser. Use the file /exercises/js/slideshow.js. Your task is to take a plain semantic HTML page and enhance it with JavaScript by adding a slideshow.

Move the #slideshow element to the top of the body.

Write code to cycle through the list items inside the element; fade one in, display it for a few seconds, then fade it out and fade in the next one.

When you get to the end of the list, start again at the beginning.

For an extra challenge, create a navigation area under the slideshow that shows how many images there are and which image you're currently viewing. (Hint: $.fn.prevAll will come in handy for this.) */
class Slideshow
{
  constructor(slidesElements) 
  {
    this.slidesElements = slidesElements;
  }

  init() 
  {
    this.navTotalCount = $('<p/>', { text : 'Total = ' + this.slidesElements.length}).addClass('newClass');
    this.navCurrent = $('<p/>', { style: 'display:inline; position:relative; left: 300px;' });
    var mainDiv = $('#main');
    mainDiv.prepend($('<div/>').append(this.navTotalCount, this.navCurrent));
    this.slidesElements.addClass('customClass');
    mainDiv.prepend(this.slidesElements);
    this.slidesElements.hide();
    this.currentSlideNumber = 0;
    this.fadeInCurrentSlide();
  }

  fadeInCurrentSlide() 
  {
    var _this = this
    this.navCurrent.text('Current = ' + (this.currentSlideNumber + 1));
    this.slidesElements.eq(this.currentSlideNumber).fadeIn(1500, function () 
    {
      _this.fadeOutCurrentSlide();
    });
  }

  fadeOutCurrentSlide() 
  {
    var _this = this;
    this.slidesElements.eq(this.currentSlideNumber).fadeOut(1500, function() 
    {
      _this.setCurrentSlideNumber();
      _this.fadeInCurrentSlide();
    });
  }

  setCurrentSlideNumber() 
  {
    var _this = this;
    _this.currentSlideNumber++;
    if(!(_this.currentSlideNumber % this.slidesElements.length)) 
    {
      _this.currentSlideNumber = 0;
    }
  }
}

$(document).ready(function() 
{
  var slidesElements = $('#slideshow li');
  var slideshow = new Slideshow(slidesElements);
  slideshow.init();
})
  