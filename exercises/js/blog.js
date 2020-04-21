/*Open the file /exercises/index.html in your browser. Use the file /exercises/js/blog.js. Your task is to add some interactivity to the blog section of the page. The spec for the feature is as follows:

Clicking on a headline in the #blog div should slide down the excerpt paragraph

Clicking on another headline should slide down its excerpt paragraph, and slide up any other currently showing excerpt paragraphs. */
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
  