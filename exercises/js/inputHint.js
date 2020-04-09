$(document).ready(function(){
  var $inputElement = $('input[name = q]'), $labelElement = $('label[for = q]').text();
  console.log($inputElement);
  console.log($labelElement);

  //Set the value of the search input to the text of the label element
  $inputElement.val($labelElement);

  //Add a class of "hint" to the search input
  $inputElement.addClass('hint');

  //Remove the label element
  var hint = $('label[for = q]').remove().text();
  console.log(hint);

  //Bind a focus event to the search input that removes the hint text and the "hint" class
  //Bind a blur event that restores the hint text and "hint" class if no search text was entered
  $inputElement.bind({
    'focus': function() {
      var $element = $(this);
      if($element.hasClass('hint')) {
          console.log("hello");
        $element.val("").removeClass('hint');
      }
    },
    'blur' : function() {
      var $element = $(this); 
      if(!$element.val()) {
          console.log("hiii");
        $element.val($('label[for = q]')).addClass('hint');
      }    
    }
  });

});
