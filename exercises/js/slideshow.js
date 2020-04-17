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
  