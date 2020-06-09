/* We are building a contact manager where user can create contacts by specifying name and email. Search them and delete them.

Add two text fields to take input of Name and Email from the user
A button to add contact, clicking on this button will validate name and email. If both name and email are present and email is valid against a regexp, add a contact box on the page. This box would contain the information entered by the user.
Include a Delete button in the contact on clicking which the contact can be deleted.
Create one search field for searching the contacts from their names only. It should filter/search contacts as I start typing in the search box i.e. realtime.
When the search field is empty, all the contacts should be displayed.
Refer following screenshots:

https://www.dropbox.com/s/ca8kfexzcnr1v5o/home.png?dl=0
https://www.dropbox.com/s/30du6xne579fx3k/filtering.png?dl=0
Note: Take an object oriented approach and identify proper classes. Follow delegations

*/

class ContactManager
{
  constructor(elements) 
  {
    this.contactList = {};
    this.filteredContact = {};
    this.$addForm = elements.addForm;
    this.$addButton = elements.addButton;
    this.$searchField = elements.searchField;
    this.$nameInputField = elements.nameInputField;
    this.$emailInputFIeld = elements.emailInputFIeld;
    this.$contactsContainer = elements.contactsContainer;
    
  }

  init() 
  {
    this.$addButton.on('click', this.addNewContact());
    this.$searchField.on('keyup', this.searchContact());
    this.$searchField.closest('form').on('submit', this.preventfromSubmit());
    this.$contactsContainer.delegate('.deleteBtn', 'click', this.deleteContact());
  }

  addNewContact() 
  {
    var _this= this;
    return function(event) {
      if(_this.validateContact() && !_this.isDuplicateContact()) 
      {
        _this.displayNewContact(_this.generateContact());
      }
      event.preventDefault();
    }
  }

  validateContact() 
  {
    var nameInput = this.$nameInputField.val().trim(),
        emailInput = this.$emailInputFIeld.val().trim(),
        isValid = false;
    if(this.validatePresence(nameInput) && this.validatePresence(emailInput)) 
    {
      isValid = this.validateEmail(emailInput);
    } 
    else 
    {
      var message = 'Please enter valid details';
      this.showError(message);
    }
    return isValid;
  }

  validatePresence(element) {
    return element.length;
  }

  validateEmail(emailInput) 
  {
    var email = new Email(emailInput),
    message = 'Please enter a valid email address';
    if(!email.isValid())
    {
      this.showError(message);
      return false;
    }
    return true;
  }

  isDuplicateContact() 
  {
    var isDuplicate = true,
      name = this.$nameInputField.val().trim();
    if(this.contactList[name]) 
    {
      isDuplicate = false;
      var message = 'This contact Already Exists.';
      this.showError(message);
    }
    return !isDuplicate;
  }

  generateContact() 
  {
    var name = this.$nameInputField.val().trim(),
        email = this.$emailInputFIeld.val().trim();
    return (new Contact(name, email));
  }

  displayNewContact(newContact) 
  {
    this.contactList[newContact.name] = newContact;
    this.filteredContact[newContact.name] = newContact;
    var length = Object.keys(this.contactList).length;
    this.addContactToGrid(newContact, length);
  }

  addContactToGrid(contact, id) 
  {
    var container = this.makeGridContainer(contact, id);
    this.$contactsContainer.append(container);
  }

  makeGridContainer(contact, id) 
  {
    var $nameElement = $('<p/>', { text: 'Name: ' })
          .append($('<span/>', { text: `${ contact.name }` })),
        $emailElement = $('<p/>', { text: 'Email: ' })
          .append($('<span/>', { text: `${ contact.email }` })),
      $deleteElement = $('<button>', { text: 'Delete', class: 'deleteBtn'}),
      $container = $('<div/>', { id: `${ id }` })
        .append($nameElement, $emailElement, $deleteElement)
        .addClass('contacts')
        .data('contactDetails', contact);
    return $container;
  }

  deleteContact() 
  {
    var _this = this;
    return function() 
    {
      var $currentContactContainer = $(this).closest('div,tr'),
      contact = $currentContactContainer.data('contactDetails');
      if(_this.confirmDeleteRequest(contact.name)) 
      {
        delete _this.contactList[contact.name];
        delete _this.filteredContact[contact.name];
        $currentContactContainer.remove();
      }
    }
  }

  confirmDeleteRequest(name) 
  {
    return confirm('Are you sure you want to delete contact ' + name + '?')
  }
  
  showError(message) 
  {
    alert(message);
  }
  
  preventfromSubmit() 
  {
    return function(event) 
    {
      event.preventDefault();
    }
  }
  
  searchContact() 
  {
    var _this = this;
    return function(event) 
    {
      var currentText = _this.$searchField.val().trim();
      if(currentText){
        var currentRegexp = new RegExp(currentText, 'i');
        _this.resetFilteredContacts();
        _this.displayFilteredContacts(currentRegexp);
      } 
      else 
      {
        _this.showAllContacts();
      }
    }
  }
  
  resetFilteredContacts() 
  {
    for(var contactName in this.filteredContact) 
    {
      delete this.filteredContact[contactName];
    }
  }
  
  displayFilteredContacts(currentRegexp) 
  {
    var _this = this,
      index = 0;
    for(var contactName in this.contactList) 
    {
      if(!currentRegexp.test(this.contactList[contactName].name)) 
      {
        delete _this.filteredContact[contactName];
        _this.$contactsContainer.find(`div#${index + 1},tr#${index + 1}`).hide();
      } 
      else 
      {
        _this.filteredContact[contactName] = _this.contactList[contactName];
        var filteredSelections = _this.$contactsContainer.find(`div#${index + 1},tr#${index + 1}`);
        if(!filteredSelections.length) 
        {
          _this.toggleView(_this.findCurrentlyVisibleContacts());
        }
      }
      index++;
    }
  }
  
  showAllContacts() 
  {
    var allContacts = [];
    for(var contactName in this.contactList) 
    {
      allContacts.push(this.contactList[contactName]);
      this.filteredContact[contactName] = this.contactList[contactName];
    }
    this.toggleView(allContacts);
  }
  
  displayContactList() 
  {
    var _this = this;
    return function () 
    {
      if(!$('table').length) 
      {
        _this.toggleView(_this.findCurrentlyVisibleContacts());
      }
    }
  }
  
  toggleView(currentlyVisibleContacts) 
  {
    this.$contactsContainer.empty();
    this.showInGridView(currentlyVisibleContacts);
  }
  
  showInGridView(currentlyVisibleContacts) 
  {
    var _this = this;
    $(currentlyVisibleContacts).each(function(index, contact){
      var contactId = _this.findIndex(contact);
      _this.addContactToGrid(contact, contactId);
    })
  }
  
  findIndex(contact) 
  {
    var x = Object.keys(this.contactList);
    var returnValue;
    $(x).each(function(index, element) 
    {
      if(contact.name == element) 
      {
        returnValue = index + 1;
      }
    })
    return returnValue;
  }
  
  displayContactGrid() 
  {
    var _this = this;
    return function() 
    {
      _this.toggleView(_this.findCurrentlyVisibleContacts());
    }
  }
  
  findCurrentlyVisibleContacts() 
  {
    var currentlyVisibleContacts = [];
    for(var contactName in this.filteredContact) {
      currentlyVisibleContacts.push(this.filteredContact[contactName])
    }
    return currentlyVisibleContacts;
  }

}
  
$(document).ready(function()
{
  var $contactMgrContainer = $('div.contact-manager');
  var requiredElements = {
    addForm: $contactMgrContainer.find('form.add-contact'),
    nameInputField: $contactMgrContainer.find('input.name'),
    emailInputFIeld: $contactMgrContainer.find('input.email'),
    addButton: $contactMgrContainer.find('input.addBtn'),
    searchField: $contactMgrContainer.find('input.search'),
    contactsContainer: $('div.contact-details'),
  };
  var contactManager = new ContactManager(requiredElements);
  contactManager.init();
})
  
  
