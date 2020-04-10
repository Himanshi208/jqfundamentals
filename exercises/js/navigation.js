class Navigation
{
  constructor(navigationLi) 
  {
    this.navigationLi = navigationLi;
  }

  init()
  {
    this.toggleEvents();
  }

  toggleEvents() 
  {
    $(this.navigationLi).hover(function()
    {
      $(this).toggleClass('hover').children('ul').toggleClass('hover');
    });
  }
};
$(document).ready(function()
{
  var $navigationLi = $('ul#nav li');
  var navigation = new Navigation($navigationLi);
  navigation.init();
}) 
  
