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