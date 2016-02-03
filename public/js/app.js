var data = document.getElementById('submit').addEventListener('click', function(e) {
  e.preventDefault();

  var populate = document.getElementById('results-container');
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
    var airline = parsedResponse.appendix.airlines[0].name;
    var departure = parsedResponse.appendix.airports[0].name;
    var departureCity = parsedResponse.appendix.airports[0].city;
    var departureState = parsedResponse.appendix.airports[0].stateCode;
    var arrival = parsedResponse.appendix.airports[1].name;
    var arrivalCity = parsedResponse.appendix.airports[1].city;
    var arrivalState = parsedResponse.appendix.airports[1].stateCode;
    var status = parsedResponse.flightStatuses[0].status;
    var scheduledGateArrival = parsedResponse.flightStatuses[0].operationalTimes.scheduledGateArrival.dateLocal;
    var arrivalTime = parsedResponse.flightStatuses[0].operationalTimes.actualGateArrival.dateLocal;

    var resultsDiv = document.getElementById('results');

    var airlineName = document.createElement('h4');
    airlineName.textContent = airline;
    resultsDiv.appendChild(airlineName);

    var depAirport = document.createElement('text');
    depAirport.textContent = "Departure: " + departure;
    depAirport.setAttribute('id', 'departure');
    resultsDiv.appendChild(depAirport);

    var depCity = document.createElement('text');
    depCity.textContent = departureCity + ', ';
    resultsDiv.appendChild(depCity);

    var depState = document.createElement('text');
    depState.textContent = departureState;
    resultsDiv.appendChild(depState);
    var linebreak = document.createElement('br');
    resultsDiv.appendChild(linebreak);

    var arrivalAirport = document.createElement('text');
    arrivalAirport.textContent = "Arrival: " + arrival;
    arrivalAirport.setAttribute('id', 'arrival');
    resultsDiv.appendChild(arrivalAirport);

    var arrCity = document.createElement('text');
    arrCity.textContent = arrivalCity + ', ';
    resultsDiv.appendChild(arrCity);

    var arrState = document.createElement('text');
    arrState.textContent = arrivalState;
    resultsDiv.appendChild(arrState);

    var flightStatus = document.createElement('h4');
    if (status==='L'){
      flightStatus.textContent = 'Status: Landed';
    } else if (status==='A') {
      flightStatus.textContent = 'Status: Active';
    } else if (status==='S') {
      flightStatus.textContent = 'Status: Scheduled';
    } else if (status==='U') {
      flightStatus.textContent = 'Status: Unknown';
    } else if (status==='R') {
      flightStatus.textContent = 'Status: Redirected';
    } else if (staus==='D') {
      flightStatus.textContent = 'Status: Diverted';
    } else if (status==='C') {
      flightStatus.textContent = 'Status: Cancelled';
    } else {
      flightStatus.textContent = 'Status: Not Operational';
    }
    resultsDiv.appendChild(flightStatus);

    var scheduledArrival = document.createElement('h4');
    var calendarDate = scheduledGateArrival.split("T").pop();
    var newTime = calendarDate.replace(/\:00.000.*/,'');

    var time = newTime;
    var time = newTime.split(':');
    var hours = Number(time[0]);
    var minutes = Number(time[1]);
    var seconds = Number(time[2]);
    var timeValue = "" + ((hours >12) ? hours - 12 : hours);  
    timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  
    timeValue += (hours >= 12) ? " P.M." : " A.M."; 

    var newDate = arrivalTime.replace(/\T.*/,'');
    scheduledArrival.textContent = 'Scheduled Arrival: ' + timeValue + ' ' + newDate;
    resultsDiv.appendChild(scheduledArrival);

    var actualArrival = document.createElement('h4');
    var arrivalDate = arrivalTime.split("T").pop();
    var newTimeArrival = arrivalDate.replace(/\:00.000.*/,'');

    var time = newTimeArrival;
    var time = newTimeArrival.split(':');
    var hours = Number(time[0]);
    var minutes = Number(time[1]);
    var seconds = Number(time[2]);
    var timeValue2 = "" + ((hours >12) ? hours - 12 : hours);  
    timeValue2 += (minutes < 10) ? ":0" + minutes : ":" + minutes;  
    timeValue2 += (hours >= 12) ? " P.M." : " A.M."; 

    var newArrivalDate = arrivalTime.replace(/\T.*/,'');
    actualArrival.textContent = 'Actual Arrival: ' + timeValue2 + ' ' + newArrivalDate;
    resultsDiv.appendChild(actualArrival);


  })
})



