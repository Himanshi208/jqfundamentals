/*Open the file /exercises/index.html in your browser. Use the file /exercises/js/load.js. Your task is to load the content of a blog item when a user clicks on the title of the item.

Create a target div after the headline for each blog post and store a reference to it on the headline element using $.fn.data.
Bind a click event to the headline that will use the $.fn.load method to load the appropriate content from /exercises/data/blog.html into the target div. Don't forget to prevent the default action of the click event.*/
class BlogPost
{
  constructor(blogHeadings) 
  {
    this.blogHeadings = blogHeadings
  }
  
  init() 
  {
    var $target = $('<div/>');
    this.blogHeadings.after($target);
    this.blogHeadings.on('click', this.showPost());
  }
    
  showPost() 
  {
    return function(event) 
    {
      $option = $(this);
      event.preventDefault();
      var $target = $option.next(), 
          $postId = $option.find('a').attr('href').split('#')[1];
      $target.load('data/blog.html div#' + $postId);
    }
  }
}
  
$(document).ready(function() 
{
    var blogHeadings = $('div#blog h3');
    var blogPosts = new BlogPost(blogHeadings);
    blogPosts.init();
})

  