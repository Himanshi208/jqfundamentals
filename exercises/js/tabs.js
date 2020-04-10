class Tabs {
  constructor(modules)
  {
  this.tabsContent = modules;
  }

  init() 
  {
    this.tabList = $('<ul></ul>').addClass('newUL');
    $(this.tabsContent[0]).before(this.tabList);
    var headings = this.extractHeadings();
    //console.log(headings);
    var removedHeader = this.detachHeader();
    //console.log(removedHeader);
    this.addToUl(removedHeader, headings);
    this.tabsContent.hide();
    this.tabList.delegate('li', 'click', this.toggler() );
    this.showFirstTab();
  }

  detachHeader() 
  {
    //console.log("detachHeader");
    return this.tabsContent.each(function (index, element) {
      $(element).find('h2').remove();
    });
  }

  extractHeadings () 
  {
    //console.log("detachHeader1");
    var headings = [];
    this.tabsContent.each(function (index, element) {
      headings.push($(element).find('h2').text());
    });
    return headings
  }
  
  addToUl(removedHeaderElements, headings) 
  {
    //console.log("detachHeader2");
    var _this = this;
    removedHeaderElements.each(function (index, element) {
      var listItem = $('<li></li>').text(headings[index]).append(removedHeaderElements[index]);4
      _this.tabList.append(listItem);
    });
  }

  toggler() 
  {
    return function() {
      $(this).toggleClass('current');
      $(this).find('div').toggle();
      $(this).siblings().removeClass('current').find('div').hide();
    };
  }

  showFirstTab() {
    $(this.tabList).find('li:first').addClass('current').find('div').show();
  }

}
 
  $(document).ready(function(){
    var modules = $('div.module');
    let tab = new Tabs(modules);
    tab.init();
  });
   