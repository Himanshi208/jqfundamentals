/* -Here, 'See All' and 'See Less' links should display more and less list items but should not do any sorting.
-For sorting purpose, append a header to the lists with class 'priority-sort', which should contain 4 buttons i.e. Alphabetic Sort, Priority Sort, Ascending and Descending.
-I should be able to select one sorting type between alphabetic sort and priority sort. And, one sorting order between Ascending and Descending. The selected buttons should be highlighted as well.
-By default, Priority Sort and Ascending should be selected.
-The sorting should work fine with both expanded list and contracted list. */

class PrioritySort
{
  constructor(elements) 
  {
    this.list = elements.list;
    this.seeMore = elements.seeMore;
    this.seeLess = elements.seeLess;
    this.ascending = elements.ascending;
    this.descending = elements.descending;
  }

  init() 
  {
    this.display();
  }

  display()
  {
    this.list.each((idx,obj) => {
        this.priorityListAscending($(obj))
        this.insertLinksOrder($(obj))
        this.insertLinksMethod($(obj))
      })
  }

  priorityListAscending(obj)
  {
    let liELements = this.getListElements(obj);
    let count = obj.data('inital-items-count');
    let newList= liELements.sort((a,b) => { return $(a).data('priority-order') > $(b).data('priority-order') });
    liELements.remove();
    obj.prepend(newList);
    newList.slice(count, newList.length).show();
  }

  priorityListDescending(obj)
  {
    let liELements = this.getListElements(obj);
    let count = obj.data('inital-items-count');
    let newList= liELements.sort((a,b) => { return $(a).data('priority-order') < $(b).data('priority-order') });
    liELements.remove();
    obj.prepend(newList);
    newList.slice(count, newList.length).show();
  }

  getListElements(obj) {
    return obj.find('li')
  }

  insertLinksMethod(obj) {
    let seeMore = this.seeMore;
    let seeLess = this.seeLess;
    this.bindShowAll(seeMore, obj);
    this.bindShowLess(seeLess, obj);
    obj.append(seeMore,seeLess);
  }

  insertLinksOrder(obj) {
    let ascending = this.ascending;
    let descending = this.descending;
    this.bindAscending(ascending, obj);
    this.bindDescending(descending, obj);
    obj.append(ascending,descending);
  }

  bindAscending(obj, target) {
    obj.on('click', () => {
      this.alphabeticListAscending(target)
    })
  }

  bindDescending(obj, target) {
    obj.on('click', () => {
      this.alphabeticListDescending(target)
    })
  }

  bindShowAll(obj, target) {
    obj.on('click', () => {
      this.alphabeticListAscending(target)
    })
  }

  bindShowLess(obj, target) {
    obj.on('click', () => {
      this.priorityListAscending(target)
    })
  }


  alphabeticListAscending(obj)
  {
    var liELements = this.getListElements(obj);
    let newList= liELements.sort((a,b) => { return $(a).text().toUpperCase() > $(b).text().toUpperCase() })
    liELements.remove()
    obj.prepend(newList.show())
  }

  alphabeticListDescending(obj)
  {
    var liELements = this.getListElements(obj);
    let newList= liELements.sort((a,b) => { return $(a).text().toUpperCase() < $(b).text().toUpperCase() })
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
    seeLess : $('<button>See Less</a>'),
    ascending : $('<button>Ascending Order</a>'),
    descending : $('<button>Descending Order</a>')
  };
  var prioritySort = new PrioritySort(requiredElements);
  prioritySort.init();
})
  
  