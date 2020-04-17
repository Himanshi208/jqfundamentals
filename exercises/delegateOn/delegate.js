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
    this.stack.on('click', 'div.item', this.changeColorOrRemove());
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
      let $option = $(this);
      if(!$option.index()) 
      {
        $option.remove();
        _this.counter--;
      } 
      else 
      {
        $option.addClass('chageColor');
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
  