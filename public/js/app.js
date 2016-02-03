var data = document.getElementById('submit').addEventListener('click', function(e) {
  e.preventDefault();

  var populate = document.getElementById('results');
  populate.className = 'show';

  var whatData = document.getElementById('what').value;
  var airlineData = document.getElementById('airline').value;
  var flightData = document.getElementById('flight').value;
  var dateData = document.getElementById('date').value;
  var airportData = document.getElementById('airport').value;

  var sendData = {
    what: whatData,
    airline: airlineData,
    flight: flightData,
    date: dateData,
    airport: airportData
  }

  console.log(sendData);

  sendData = JSON.stringify(sendData);
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/search', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(sendData);
  xhr.addEventListener('load', function() {

    var response = xhr.responseText;

    var parsedResponse = JSON.parse(response);
    console.log(response);
  })
})