console.log('\'Allo \'Allo!');

var viewModel = function () {
  var self = this;
  var accountForm = document.getElementById('account');
  var eventForm = document.getElementById('event');
  self.accountSubmit = function() {
    accountForm.innerHTML = '<form class="col-lg-6" id="event">\
              <h1>What''s your event?</h1>\
              <div class="form-group">\
                <label for="eventname">Event Name\
                  <input class="form-control" type="text" id="eventname" placeholder="Event Name" required>\
                </label>\
              </div>\
              <div class="form-group">\
                <label for="eventtype">Event Type\
                  <input class="form-control" type="text" id="eventtype" placeholder="Event Description" required>\
                </label>\
              </div>\
              <div class="form-group">\
                <label for="eventhost">Event Host\
                  <input class="form-control" type="text" id="eventhost" placeholder="Event Host" required>\
                </label>\
              </div>\
              <div class="form-group">\
                <label for="eventstart">Event Start\
                  <input class="form-control" type="datetime-local" id="eventstart" required>\
                </label>\
              </div>\
              <div class="form-group">\
                <label for="eventend">Event End\
                  <input class="form-control" type="datetime-local" id="eventend" required>\
                </label>\
              </div>\
              <div class="form-group">\
                <label for="location">Location\
                  <input class="form-control" type="text" id="location" required>\
                </label>\
              </div>\
              <p><button class="btn btn-default" form="event" id="eventsubmit" type="submit">Submit</button></p>\
            </form>';
  }
}

ko.applyBindings(new viewModel());
