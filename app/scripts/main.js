console.log('\'Allo \'Allo!');

var viewModel = function () {
  var self = this;
  var accountForm = document.getElementById('account');
  self.accountSubmit = function() {
    accountForm.classList.add('invisible');
  }
}

ko.applyBindings(new viewModel());
