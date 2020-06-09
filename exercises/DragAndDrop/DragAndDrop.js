/* There is an exercise that you did in JAVASCRIPT track which was :

Create two multiple selection box like https://www.dropbox.com/s/cbaneqgyw5tpawe/selection.png?dl=0

First box contains list of countries and when you select a country and click on add button. Selected country will disappear from first box and appear in second button. And when you select a country from second box and click on remove button it will disappear from second box and appear in first box

Pretty simple. Now, in this drop the two buttons and implement the same using drag and drop feature using JQuery UI */

class OptionMover
    {
      constructor(options)
      {
        this.select_from = options.select_from;
        this.select_to = options.select_to;
      }

      init() {
        this.makeDraggable()
        this.makeDroppable()
      }
    
      makeDraggable() {
        this.select_from.children().draggable({revert: 'invalid'})
        this.select_to.children().draggable({revert: 'invalid'})
      }
    
      makeDroppable() {
        this.select_to.droppable({drop: this.dropFunction})
        this.select_from.droppable({drop: this.dropFunction})
      }
    

      moveOption(event, ui) {
        $(this).append(ui.draggable.removeAttr('style').draggable({revert: 'invalid'}))
      }

    }
    
    $(document).ready(function(){
      var options = {
      select_from : $('#select_from'),
      select_to : $('#select_to')
      };
      let optionMover = new OptionMover(options);
      optionMover.init();
    });
