class Specials{
  constructor(selectorStrings) 
  {
    this.$specialForm = $(selectorStrings.formContainer);
    this.$listButton = $(selectorStrings.listButton);
  }
  
  init() 
  {
    var $target = $('<div/>').attr('data-behaviour', 'target-div');
    this.$specialForm.after($target).data('data-special-form', 'target-div');
    this.$listButton.remove();
    this.bindEvents();
  }
  
  bindEvents() 
  {
    this.$specialForm.on('change', 'select' , this.showSpecial());
  }
  
  showSpecial() 
  {
    var _this = this;
    return function() 
    {
      var dataBehaviourValue = _this.$specialForm.data('data-special-form'),
          selectedDay = $(this.options[this.selectedIndex]).attr('value'),
          $target = _this.$specialForm.parent()
            .find(`[data-behaviour=${ dataBehaviourValue }]`);
      if(selectedDay)
      {
        _this.ajaxRequestSender($target, selectedDay);
      }
    }
  }
  
  ajaxRequestSender($target, selectedDay) 
  {
    $target.empty();
    if(this.CachedJson) 
    {
      this.successHandler(this.CachedJson, selectedDay, $target);
    } else 
    {
      this.sendAjaxRequest(selectedDay, $target);
    }
  }
  
  sendAjaxRequest(selectedDay, $target) 
  {
    var _this = this;
    $.ajax({
        url: 'data/specials.json',
        data: selectedDay,
        method: 'GET',
        dataType: 'json',
        success: function(json) {
          _this.successHandler(json, selectedDay, $target);
        },
        error: function() {
          _this.errorHandler();
        }
      })
  }
  
  successHandler(json, selectedDay, $target) 
  {
    var offerOfTheDay = json[selectedDay];
    $target.append($('<h4/>', { text: offerOfTheDay.title}))
      .append($('<p/>', { text: offerOfTheDay.text }))
      .append($('<img/>', { src: offerOfTheDay.image }));
    $target.css('color', offerOfTheDay.color);
    this.CachedJson = json;
  }
  
  errorHandler() 
  {
    alert('Your Request cannont be processed');
  }
}
  
$(document).ready(function()
{
  var selectorStrings = {
    formContainer: 'div#specials form',
    listButton: 'div#specials li.buttons'
  }
  var specials = new Specials(selectorStrings);
  specials.init();
})