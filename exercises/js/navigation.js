/*Open the file /exercises/index.html in your browser. Use the file /exercises/js/navigation.js. Your task is to add dropdowns to the main navigation at the top of the page.

Hovering over an item in the main menu should show that item's submenu items, if any.

Exiting an item should hide any submenu items.

To accomplish this, use the $.fn.hover method to add and remove a class from the submenu items to control whether they're visible or hidden. (The file at /exercises/css/styles.css includes the "hover" class for this purpose.)

You might want to change the CSS files a little bit for this exercise. */
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
  
