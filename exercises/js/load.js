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
    this.bindEvents();
  }
  
  bindEvents() 
  {
    this.blogHeadings.on('click', this.showPost());
  };
  
  showPost() 
  {
    return function(event) 
    {
      $option = $(this);
      event.preventDefault();
      var $target = $option.next(), 
                    postId = $option.find('a').attr('href').split('#')[1];
      $target.load('data/blog.html div#' + postId);
    }
  }
}
  
$(document).ready(function() 
{
    var blogHeadings = $('div#blog h3');
    var blogPosts = new BlogPost(blogHeadings);
    blogPosts.init();
})

  