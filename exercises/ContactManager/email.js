class Contact
{
  constructor(name, email) 
  {
    this.name = name;
    this.email = email;
  }
}

class Email
{
  constructor(email) 
  {
    this.email = email;
  }
  
  isValid()
  {
    var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return regex.test(this.email);
  }
}