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
      var listItem = $('<li></li>').text(headings[index]).append(removedHeaderElements[index]);
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
   