//create a request variable and assing a new XMLHttpRequest object
var request = new XMLHttpRequest();
//open new connection, using GET request on URL endpoint
request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);
/**var url = "https://developers.zomato.com/api/v2.1/restaurant?res_id=RESID";
request.open('GET', url, true);
request.send();
var received = JSON.parse(this.response);
{Need to then access price}
**/

request.onload = function (){
// begin accessing json data here
  var data = JSON.parse(this.response);

  data.forEach(movie => {
    //log each title
    console.log(movie.title);
  });
}

// send request
request.send();
