/*Open the file /exercises/index.html in your browser. Use the file /exercises/js/tabs.js. Your task is to create tabbed navigation for the two div.module elements. To accomplish this:

Hide all of the modules.
Create an unordered list element before the first module.
Iterate over the modules using $.fn.each. For each module, use the text of the h2 element as the text for a list item that you add to the unordered list element.
Bind a click event to the list item that:
-Shows the related module, and hides any other modules
-Adds a class of "current" to the clicked list item
-Removes the class "current" from the other list item
Finally, show the first tab. */
class Tabs 
{
  constructor(modules)
  {
    this.tabsContent = modules;
  }

  init() 
  {
    this.tabList = $('<ul>').addClass('newUL');
    $(this.tabsContent[0]).before(this.tabList);
    var headings = this.extractHeadings();
    var removedHeader = this.detachHeader();
    this.addToUl(removedHeader, headings);
    this.tabsContent.hide();
    this.tabList.delegate('li', 'click', this.toggler() );
    this.showFirstTab();
  }

  detachHeader() 
  {
    return this.tabsContent.each(function (index, element) {
      $(element).find('h2').remove();
    });
  }

  extractHeadings () 
  {
    var headings = [];
    this.tabsContent.each(function (index, element) {
      headings.push($(element).find('h2').text());
    });
    return headings
  }
  
  addToUl(removedHeaderElements, headings) 
  {
    var _this = this;
    removedHeaderElements.each(function (index, element) {
      var listItem = $('<li>').text(headings[index]).append(removedHeaderElements[index]);
      _this.tabList.append(listItem);
    });
  }

  toggler() 
  {
    return function() {
      var _this = $(this);
      _this.toggleClass('current');
      _this.find('div').toggle();
      _this.siblings().removeClass('current').find('div').hide();
    };
  }

  showFirstTab() {
    $(this.tabList).find('li:first').addClass('current').find('div').show();
  }

}
 
  $(document).ready(function(){
    var modules = $('div.module');
    var tab = new Tabs(modules);
    tab.init();
  });
   