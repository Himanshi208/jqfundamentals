$(document).ready(function()
{

  // Select all of the div elements that have a class of "module".
  $('div.module');

  // Come up with three selectors that you could use to get the third item in the #myList unordered list. Which is the best to use? Why?
  $('#myList li:nth-child(3)');
  $('#myList li').eq(2); 
  $('#myListItem');      //best way

  // Select the label for the search input using an attribute selector
  $("label[for='q']");

  // Figure out how many elements on the page are hidden
  $(":hidden").length;

  // Figure out how many image elements on the page have an alt attribute
  $("img[alt]").length;

  // Select all of the odd table rows in the table body
  $("table tbody tr:even");

  //Exercise 2

  // Select all of the image elements on the page; log each image's alt attribute.
  $('img').each(function(index, element) {
    console.log($(element).attr('alt'));
  });

  // Select the search input text box, then traverse up to the form and add a 
  //class to the form.
  $('#search input[type="text"]').parents('#search').addClass('newClass');

  // Select the list item inside #myList that has a class of "current" and remove 
  //that class from it; add a class of "current" to the next list item.
  $('#myList li.current').removeClass('current').next().addClass('current');

  // Select the select element inside #specials; traverse your way to the submit button.
  $('#specials select').parents('ul').find('input.input_submit');

  // Select the first list item in the #slideshow element; add the class "current" to it, and then add a class of "disabled" to its sibling elements.
  $('#slideshow li:first').addClass('current').siblings().addClass('disabled');

  //Exercise 3

  // Add five new list items to the end of the unordered list #myList.
  var listItems = '', maxListItems = 5;
  for (i = 1; i <= maxListItems;i = i + 1)
  {
    listItems = listItems + '<li> New List Item ' + i + '</li>';
  } 
  $('#myList').append(listItems);

  // Remove the odd list items
  $('#myList li:even').remove();

  // Add another h2 and another paragraph to the last div.module
  $('div.module:last').append('<h2>New Heading</h2>').append('<p>New Paragraph</p>');

  // Add another option to the select element; give the option the value "Wednesday"
  $('select[name="day"]').append('<option value="Wednesday">Wednesday</option>');

  // Add a new div.module to the page after the last one; put a copy of one of the existing images inside of it. 
  $('div.module:last').after('<div class="module"></div>').next().append($('img:first').clone());
  
});
