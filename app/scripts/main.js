console.log('\'Allo \'Allo!');

var viewModel = function () {
  var self = this;
  var accountForm = document.getElementById('account');
  var eventForm = document.getElementById('event');
  var progressBar = document.getElementById('progress');
  self.accountSubmit = function() {
    progressBar.value = 50;
    accountForm.innerHTML = "<h1>Thanks!</h1>";
    eventForm.classList.remove("invisible");
  }
  self.eventSubmit = function() {
    console.log(test);
  }
}

ko.applyBindings(new viewModel());
