/* Open the file /exercises/index.html in your browser. Use the file /exercises/js/specials.js. Your task is to show the user details about the special for a given day when the user selects a day from the select dropdown.

Append a target div after the form that's inside the #specials element; this will be where you put information about the special once you receive it.
Bind to the change event of the select element; when the user changes the selection, send an Ajax request to /exercises/data/specials.json.

When the request returns a response, use the value the user selected in the select (hint: $.fn.val) to look up information about the special in the JSON response.
Add some HTML about the special to the target div you created.
Finally, because the form is now Ajax-enabled, remove the submit button from the form.
Note: that we're loading the JSON every time the user changes their selection. How could we change the code so we only make the request once, and then use a cached response when the user changes their choice in the select?
*/

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