// these scripts have been written utilising only ECMAScript 3 to prevent older browser issues
function callAPI() {
  var url = "https://api.github.com/users/unipartdigital"
  $.ajax({
    url: url,
    type: "GET"
  })
    .done(function(result) {
    // it is expected that a JSON object is returned via the API, so guard against not receiving that
    if (typeof result !== 'object') {
      $('.errors').append('<li>Unexpected data format return from API</li>')
      return
    }
    // Object.keys provides only OWN properties of an object, so no need to check
    // using .hasOwnProperty() when we iterate over the keys array
    var keys = Object.keys(result)
    for (var i = 0; i < keys.length; i++) {
      var value = result[keys[i]]
      // some data values may be missing or null, so substitute a more user-friendly value
      if (value === '' || value === null || value === undefined) value = 'Data missing!'
      $('.success').append('<li>' + keys[i] + ': ' + '<span class="value">' + value + '</span>' + '</li>')
    }
  })
    .fail(function() {
      $('.errors').append('<p>No data found</p>')
    })
}

$(document).ready(function() {
  callAPI()
})
