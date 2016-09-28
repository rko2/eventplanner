console.log('\'Allo \'Allo!');

var viewModel = function () {
  var self = this;

  /* grab inputs */

  var accountForm = document.getElementById('account');
  var eventForm = document.getElementById('event');
  var progressBar = document.getElementById('progress');
  var accountName = document.getElementById('name');
  var accountEmail = document.getElementById('email');
  var passFirst = document.getElementById('password');
  var passSecond = document.getElementById('confirmPass');
  var progressNote = document.getElementById('progressNote');

  /* create variables for use in setting custom validity */

  var errorMessages;
  var error;

  /* use observables to keep track of values input in forms */

  self.eventName = ko.observable('');
  self.eventType = ko.observable('');
  self.eventHost = ko.observable('');
  self.eventStart = ko.observable('');
  self.eventEnd = ko.observable('');
  self.eventLocation = ko.observable('');
  self.eventGuest = ko.observable('');

  /* use observable arrays to keep track of lists constructed by form submission */

  self.guestList = ko.observableArray([]);
  self.eventList = ko.observableArray([]);


  /* update the progress bar as the user fills out the account creation form */

  accountName.addEventListener('input', function(e) {
    progressBar.value = 25;
  })
  accountEmail.addEventListener('input', function(e) {
    progressBar.value = 50;
  })

  /* continue updating the progress bar while also validating the user's password */

  passFirst.addEventListener('input', function(e) {
    progressBar.value = 75;
    errorMessages = [];
    if (passFirst.value.length < 10) {
      errorMessages.push('The password must be longer than 10 characters. ');
    }
    if (passFirst.value.length > 30) {
      errorMessages.push('The password must be shorter than 30 characters. ');
    }
    if (!passFirst.value.match(/[0-9]/g)) {
      errorMessages.push('The password must contain a number. ');
    }
    if (!passFirst.value.match(/[A-Z]/g)) {
      errorMessages.push('The password must contain an uppercase letter. ');
    }
    if (!passFirst.value.match(/[a-z]/g)) {
      errorMessages.push('The password must contain a lowercase letter. ')
    }
    else {
      errorMessages.push('');
    }
    if (errorMessages.length > 0) {
      error = errorMessages.join();
      passFirst.setCustomValidity(error);
    }
    else {
      passFirst.setCustomValidity('');
    }
  })

  /* check to see if the password and confirm password fields match */

  passSecond.addEventListener('input', function(e) {
    console.log(passSecond.value);
    if (passSecond.value != passFirst.value) {
      passSecond.setCustomValidity('The passwords must match.');
    } else {
      passSecond.setCustomValidity('');
    }
  })

  /* complete the progress bar and replace the account creation form; also make the event creation form usable. */

  self.accountSubmit = function() {
    progressBar.value = 100;
    accountForm.innerHTML = '<h1>Thanks for creating your account!</h1>';
    progressNote.innerHTML = 'Your account is ready!';
    eventForm.classList.remove('invisible');
  }

  /* add guests to the event */

  self.addGuest = function() {
    self.guestList.push(self.eventGuest());
    console.log(self.guestList());
    self.eventGuest('');
  }

  /* submit the current event in the form, and clear all form fields */

  self.eventSubmit = function() {
    console.log(self.eventName());
    addEvent();
    self.eventName('');
    self.eventType('');
    self.eventHost('');
    self.eventStart('');
    self.eventEnd('');
    self.eventLocation('');
    self.guestList([]);
    console.log(self.eventName());
  }

  var addEvent = function() {
    self.eventList.push(new newEvent());
    console.log(self.eventList());
  }

  /* this is the event object that is created whenever the user triggers the eventSubmit function by submitting the form */

  var newEvent = function() {
    this.name = self.eventName();
    this.type = self.eventType();
    this.host = self.eventHost();
    this.start = self.eventStart();
    this.stop = self.eventEnd();
    this.location = self.eventLocation();
    this.guests = self.guestList();
  }

}

ko.applyBindings(new viewModel());
