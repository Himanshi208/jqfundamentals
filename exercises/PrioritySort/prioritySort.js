/* -The html contains various Unordered lists.
-For the lists (ULs) with class 'priority-sort', the following conditions should be satisfied-
-This list (UL) should have a data attribute 'initial-items-count' whose value is a number.
-a few list items in this list have a data attribute 'priority-order'. The value of this attribute is 1, 2, 3 etc. eg ,
-Initially, the number of list items displayed on the page should be equal to the value of 'initial-items-count'. Also, the displayed list items should be sorted by the value of data attribute 'priority-order'.
-There should be a 'See all' link after the displayed items.
-On clicking the 'See All' link, I should be able to see all the list items. Also, the list items should now be sorted alphabetically.
-There should be a 'See Less' link when all the list items are displayed. On clicking this link, I should see the list items equal to the value of 'initial-items-count' and sorted by priority order. */

class PrioritySort
{
  constructor(elements) 
  {
    this.list = elements.list;
    this.seeMore = elements.seeMore;
    this.seeLess = elements.seeLess;
  }

  init() 
  {
    this.display();
  }

  display()
  {
    this.list.each((idx,obj) => {
        this.priorityList($(obj))
        this.insertLinks($(obj))
      })
  }

  priorityList(obj)
  {
    let liELements = this.getListElements(obj);
    let count = obj.data('inital-items-count');
    let newList= liELements.sort((a,b) => { return $(a).data('priority-order') > $(b).data('priority-order') });
    liELements.remove();
    obj.prepend(newList);
    newList.slice(count, newList.length).show();
  }

  getListElements(obj) {
    return obj.find('li')
  }

  insertLinks(obj) {
    let seeMore = this.seeMore;
    let seeLess = this.seeLess;
    this.bindShowAll(seeMore, obj);
    this.bindShowLess(seeLess, obj);
    obj.append(seeMore,seeLess);
  }

  bindShowAll(obj, target) {
    obj.on('click', () => {
      this.alphabeticList(target)
    })
  }

  bindShowLess(obj, target) {
    obj.on('click', () => {
      this.priorityList(target)
    })
  }


  alphabeticList(obj)
  {
    var liELements = this.getListElements(obj);
    let newList= liELements.sort((a,b) => { return $(a).text().toUpperCase() > $(b).text().toUpperCase() })
    liELements.remove()
    obj.prepend(newList.show())
  }

}
  
$(document).ready(function()
{
  var $listContainer = $('div.list');
  var requiredElements = {
    list: $listContainer.find('ul.priority-sort'),
    seeMore : $('<button>See More</a>'),
    seeLess : $('<button>See Less</a>')
  };
  var prioritySort = new PrioritySort(requiredElements);
  prioritySort.init();
})
  
  