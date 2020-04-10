class Blogs
{
  constructor($blogContainer) 
  {
    this.$blogContainer = $blogContainer;
  }

  init() 
  {
    this.$blogContainer.find('h3').delegate('a', 'click', this.toggler() );
  }

  toggler() 
  {
    return function(event) 
    {
      event.preventDefault();
      var $listElement = $(this).closest('li');
      $listElement.siblings().find('p.excerpt').slideUp('slow');
      $listElement.find('p.excerpt').slideToggle('slow');
    }
  }

};
  
$(document).ready(function()
{
  var $blogContainer = $('div#blog');
  let blogs = new Blogs($blogContainer);
  blogs.init();
})
  