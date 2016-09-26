console.log('\'Allo \'Allo!');

var viewModel = function () {
  var self = this;
  var accountForm = document.getElementById('account');
  var eventForm = document.getElementById('event');
  var progressBar = document.getElementById('progress');
  var accountName = document.getElementById('name');
  var accountEmail = document.getElementById('email');
  var passFirst = document.getElementById('password');
  var passSecond = document.getElementById('confirmpass');
  var progressNote = document.getElementById('progressnote');
  self.eventName = ko.observable('');
  self.eventType = ko.observable('');
  self.eventHost = ko.observable('');
  self.eventStart = ko.observable('');
  self.eventEnd = ko.observable('');
  self.eventLocation = ko.observable('');
  self.eventGuest = ko.observable('');
  self.guestList = ko.observableArray([]);
  self.eventList = ko.observableArray([]);
  accountName.addEventListener('input', function(e) {
    progressBar.value = 25;
  })
  accountEmail.addEventListener('input', function(e) {
    progressBar.value = 50;
  })
  passFirst.addEventListener('input', function(e) {
    progressBar.value = 75;
  })
  passSecond.addEventListener('input', function(e) {
    console.log(passSecond.value);
    if (passSecond.value != passFirst.value) {
      passSecond.setCustomValidity('The passwords must match.');
    } else {
      passSecond.setCustomValidity('');
    }
  })
  self.accountSubmit = function() {
    progressBar.value = 100;
    accountForm.innerHTML = '<h1>Thanks for creating your account!</h1>';
    progressNote.innerHTML = 'Your account is ready!';
    eventForm.classList.remove('invisible');
  }
  self.addGuest = function() {
    self.guestList.push(self.eventGuest());
    console.log(self.guestList());
    self.eventGuest('');
  }
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
