console.log('\'Allo \'Allo!');

var viewModel = function () {
  var self = this;
  var accountForm = document.getElementById('account');
  var eventForm = document.getElementById('event');
  var progressBar = document.getElementById('progress');
  var passFirst = document.getElementById('password');
  var passSecond = document.getElementById('confirmpass');
  self.eventName = ko.observable('');
  self.eventType = ko.observable('');
  self.eventList = ko.observableArray([]);
  passSecond.addEventListener('input', function(e) {
    console.log(passSecond.value);
    if (passSecond.value != passFirst.value) {
      passSecond.setCustomValidity('The passwords must match.');
    } else {
      passSecond.setCustomValidity('');
    }
  })
  self.accountSubmit = function() {
    progressBar.value = 50;
    accountForm.innerHTML = '<h1>Thanks!</h1>';
    eventForm.classList.remove('invisible');
  }
  self.eventSubmit = function() {
    console.log(self.eventName());
    addEvent();
    self.eventName('');
    self.eventType('');
    console.log(self.eventName());
  }

  var addEvent = function() {
    self.eventList.push(new newEvent());
    console.log(self.eventList());
  }

  var newEvent = function() {
    this.name = self.eventName();
    this.type = self.eventType();
  }

}

ko.applyBindings(new viewModel());
