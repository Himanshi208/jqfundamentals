function Item(itemDiv) 
{
  this.$itemDiv = itemDiv;
}

class Stack
{
  constructor(container) 
  {
    this.container = container;
    this.stack = container.find('div#stack');
    this.addItemButton = container.find('button#addItem');
    this.counter = 1;
  }
  
  init() 
  {
    this.addItemButton.on('click', this.addNewItem());
    this.stack.delegate('div.item', 'click', this.changeColorOrRemove());
  }
  
  
  addNewItem() 
  {
    var _this = this;
    return function() {
      var newItem = new Item($('<div/>', { text: `New Item ${ _this.counter }`, class: 'item' }));
      _this.pushItem(newItem);
    }
  }
  
  pushItem(item) 
  {
    this.counter++;
    this.stack.prepend(item.$itemDiv);
  };
  
  changeColorOrRemove() 
  {
    var _this = this;
    return function() 
    {
      if(!$(this).index()) 
      {
        $(this).remove();
        _this.counter--;
      } 
      else 
      {
        $(this).addClass('chageColor');
      }
  
    }
  }
}
  
$(document).ready(function()
{
  var container = $('div.container');
  var stack = new Stack(container);
  stack.init();
})
  