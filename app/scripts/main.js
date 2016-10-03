var viewModel = function () {
  var self = this;
  var focusTimer;
  var beginTime, endTime, presentTime, timeOffset;
  var forms = document.getElementsByTagName('form');
  var progressTrack;

  /* grab inputs */
  /* really ugly right now, something to look back to */

  var accountForm = document.getElementById('account');
  var eventForm = document.getElementById('event');
  var progressBar = document.getElementById('progress');
  var accountName = document.getElementById('name');
  var accountEmail = document.getElementById('email');
  var passFirst = document.getElementById('password');
  var passSecond = document.getElementById('confirmPass');
  var progressNote = document.getElementById('progressNote');
  var eventName = document.getElementById('eventName');
  var eventType = document.getElementById('eventType');
  var eventHost = document.getElementById('eventHost');
  var eventLocation = document.getElementById('location')
  var eventGuestList = document.getElementById('guest');
  var eventClose = document.getElementById('eventEnd');
  var eventOpen = document.getElementById('eventStart');

  /* create variables for use in setting custom validity */
  /* grabbing inputs and creating elements is really ugly now, something to look at in the future */

  var errorMessages;
  var error;
  var accountNameValidity = document.createElement('div');
  accountNameValidity.classList.add('text-danger');
  accountName.parentNode.insertBefore(accountNameValidity, accountName.nextSibling);
  var accountEmailValidity = document.createElement('div');
  accountEmailValidity.classList.add('text-danger');
  accountEmail.parentNode.insertBefore(accountEmailValidity, accountEmail.nextSibling);
  var passFirstValidity = document.createElement('div');
  passFirstValidity.classList.add('text-danger');
  passFirst.parentNode.insertBefore(passFirstValidity, passFirst.nextSibling);
  var passSecondValidity = document.createElement('div');
  passSecondValidity.classList.add('text-danger');
  passSecond.parentNode.insertBefore(passSecondValidity, passSecond.nextSibling);
  var eventNameCheck = document.createElement('div');
  eventNameCheck.classList.add('text-danger');
  eventName.parentNode.insertBefore(eventNameCheck, eventName.nextSibling);
  var eventTypeCheck = document.createElement('div');
  eventTypeCheck.classList.add('text-danger');
  eventType.parentNode.insertBefore(eventTypeCheck, eventType.nextSibling);
  var eventHostCheck = document.createElement('div');
  eventHostCheck.classList.add('text-danger');
  eventHost.parentNode.insertBefore(eventHostCheck, eventHost.nextSibling);
  var eventLocationCheck = document.createElement('div');
  eventLocationCheck.classList.add('text-danger');
  eventLocation.parentNode.insertBefore(eventLocationCheck, eventLocation.nextSibling);
  var eventOpenValidity = document.createElement('div');
  eventOpenValidity.classList.add('text-danger');
  eventOpen.parentNode.insertBefore(eventOpenValidity, eventOpen.nextSibling);
  var eventCloseValidity = document.createElement('div');
  eventCloseValidity.classList.add('text-danger');
  eventClose.parentNode.insertBefore(eventCloseValidity, eventClose.nextSibling);
  var eventGuestValidity = document.createElement('div');
  eventGuestValidity.classList.add('text-danger');
  eventGuestList.parentNode.insertBefore(eventGuestValidity, eventGuestList.nextSibling);

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

  /* validate the user's account information */

  self.accountNameCheck = function() {
    if (!accountName.value) {
      accountNameValidity.innerHTML = '<p id="accountNameValidity">Please enter a name.</p>';
    } else {
      accountNameValidity.innerHTML = '';
    }
  }

  self.accountEmailCheck = function() {
    accountEmailValidity.innerHTML = '<p id="accountEmailValidity">' + accountEmail.validationMessage + '</p>';
  }

  self.passFirstCheck = function() {
    errorMessages = [];
    if (passFirst.value.length < 10) {
      errorMessages.push('The password must be longer than 10 characters');
    }
    if (passFirst.value.length > 30) {
      errorMessages.push('The password must be shorter than 30 characters');
    }
    if (!passFirst.value.match(/[0-9]/g)) {
      errorMessages.push('The password must contain a number');
    }
    if (!passFirst.value.match(/[A-Z]/g)) {
      errorMessages.push('The password must contain an uppercase letter');
    }
    if (!passFirst.value.match(/[a-z]/g)) {
      errorMessages.push('The password must contain a lowercase letter')
    } else {
      errorMessages.push('');
      passFirst.setCustomValidity('');
    }
    if (errorMessages.length > 0) {
      error = errorMessages.join();
      passFirstValidity.innerHTML = '<p id=passFirstValidity>' + error + '</p>';
      passFirst.setCustomValidity(error);
    }
  }

  self.passSecondCheck = function() {
    if (passSecond.value != passFirst.value) {
      passSecond.setCustomValidity('The passwords must match.');
      passSecondValidity.innerHTML = '<p id=passSecondValidity>The passwords must match</p>';
    } else {
      passSecond.setCustomValidity('');
      passSecondValidity.innerHTML = '';
    }
  }

  /* disable the default validity messages, as described on HTML5Rocks */

  for (var i = 0; i < forms.length; i++) {
    forms[i].addEventListener('invalid', function(e) {
      e.preventDefault();
    }, true);
  }

  /* replace the account creation form; also make the event creation form usable. */

  self.accountSubmit = function() {
    accountForm.innerHTML = '<h1>Thanks for creating your account!</h1>';
    progressNote.innerHTML = 'Your account is ready!';
    eventForm.classList.remove('invisible');
    focusTimer = window.setTimeout(eventFocus, 50);
  }

  /* keep track of progress based on number of inputs validated */

  self.checkProgress = function() {
    progressTrack = [];
    if (accountName.value) {
      progressTrack.push('0');
    }
    if (accountEmail.value && accountEmail.checkValidity()) {
      progressTrack.push('1');
    }
    if (passFirst.value && passFirst.checkValidity()) {
      progressTrack.push('2');
    }
    if (confirmPass.value && confirmPass.checkValidity()) {
      progressTrack.push('3');
    }
    if (progressTrack.length > 0) {
      progressBar.value = 25;
    }
    if (progressTrack.length > 1) {
      progressBar.value = 50
    }
    if (progressTrack.length > 2) {
      progressBar.value = 75;
    }
    if (progressTrack.length > 3) {
      progressBar.value = 100;
    }
  }

  /* set autofocus on event creation form when it appears */

  var eventFocus = function() {
    eventName.focus();
  }

  /* add guests to the event */

  self.addGuest = function() {
    self.guestList.push(self.eventGuest());
    self.eventGuest('');
  }

  /* submit the current event in the form, and clear all form fields */

  self.eventSubmit = function() {
     addEvent();
     self.eventName('');
     self.eventType('');
     self.eventHost('');
     self.eventStart('');
     self.eventEnd('');
     self.eventLocation('');
     self.guestList([]);
  }

  /* real time validation to all event creation fields */

  self.eventNameCheck = function() {
    if (!self.eventName()) {
      eventNameCheck.innerHTML = '<p id="eventNameCheck">Please enter an event name.</p>';
    } else {
      eventNameCheck.innerHTML ='';
    }
  }

  self.eventTypeCheck = function() {
    if (!self.eventType()) {
      eventTypeCheck.innerHTML = '<p id="eventNameCheck">Please choose an event type.</p>';
    } else {
      eventTypeCheck.innerHTML ='';
    }
  }

  self.eventHostCheck = function() {
    if (!self.eventHost()) {
      eventHostCheck.innerHTML = '<p id="eventNameCheck">Please enter the host\'s name.</p>';
    } else {
      eventHostCheck.innerHTML ='';
    }
  }

  self.eventLocationCheck = function() {
    if (!self.eventLocation()) {
      eventLocationCheck.innerHTML = '<p id="eventLocationCheck">Please enter the location.</p>';
    } else {
      eventLocationCheck.innerHTML ='';
    }
  }

  self.guestCheck = function() {
    if (self.guestList().length < 1 && !(self.eventGuest())) {
      eventGuestList.setCustomValidity('Please enter at least one guest.');
      eventGuestValidity.innerHTML = '<p id="eventGuestValidity">Please enter at least one guest</p>';
    } else {
      eventGuestList.setCustomValidity('');
      eventGuestValidity.innerHTML = '';
    }
  }

  self.pastCheck = function() {
    beginTime = new Date(self.eventStart());
    timeOffset = beginTime.getTimezoneOffset();
    console.log(timeOffset);
    console.log(beginTime.getTime());
    console.log(beginTime.getTime() + timeOffset * 60000);
    beginTime = beginTime.getTime() + timeOffset * 60000;
    /* beginTime = beginTime.toISOString(); */
    console.log(beginTime);
    presentTime = new Date();
    console.log(presentTime);
    console.log(presentTime.getTime() < beginTime);
    if (!(presentTime.getTime() < beginTime)) {
      eventOpen.setCustomValidity('The event can\'t start before the present time.' )
      eventOpenValidity.innerHTML = '<p id="eventOpenValidity"> The event can\'t start before the present time.</p>';
    } else {
      eventOpen.setCustomValidity('');
      eventOpenValidity.innerHTML = '';
    }
  }

  self.timeCompare = function() {
    beginTime = new Date(self.eventStart());
    endTime = new Date(self.eventEnd());
    if (!(endTime > beginTime)) {
      eventClose.setCustomValidity('The event has to end after the start time.');
      eventCloseValidity.innerHTML = '<p id="eventCloseValidity"> The event has to end after the start time.</p>';
    } else {
      eventClose.setCustomValidity('');
      eventCloseValidity.innerHTML = '';
    }
  }

  var addEvent = function() {
    self.eventList.push(new newEvent());
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
