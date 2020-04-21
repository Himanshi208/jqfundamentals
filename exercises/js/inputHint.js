/*Open the file /exercises/index.html in your browser. Use the file /exercises/js/inputHint.js or work in Firebug. Your task is to use the text of the label for the search input to create "hint" text for the search input. The steps are as follows:

Set the value of the search input to the text of the label element

Add a class of "hint" to the search input

Remove the label element

Bind a focus event to the search input that removes the hint text and the "hint" class

Bind a blur event to the search input that restores the hint text and "hint" class if no search text was entered */

$(document).ready(function(){
  var $inputElement = $('input[name = q]'), $labelElement = $('label[for = q]'), $labelValue = $labelElement.text();

  //Set the value of the search input to the text of the label element
  $inputElement.val($labelValue);

  //Add a class of "hint" to the search input
  $inputElement.addClass('hint');

  //Remove the label element
  $labelElement.remove();

  //Bind a focus event to the search input that removes the hint text and the "hint" class
  //Bind a blur event that restores the hint text and "hint" class if no search text was entered
  $inputElement.bind({
    'focus': function() {
      var $element = $(this);
      if($element.hasClass('hint')) {
        $element.val("").removeClass('hint');
      }
    },
    'blur' : function() {
      var $element = $(this); 
      if(!$element.val()) {
        $element.val($labelValue).addClass('hint');
      }    
    }
  });

});
