
function searched(){
  var searchedWord = document.getElementById("searchTerm").value;
  alert(searchedWord);
 
    // create a new div element 
    var newDiv = document.createElement("div"); 
    // and give it some content 
    var newContent = document.createTextNode("You searched'" + searchedWord+"'"); 
    // add the text node to the newly created div
    newDiv.appendChild(newContent);  
  
    // add the newly created element and its content into the DOM 
    var currentDiv = document.getElementById("wrap"); 
    document.body.insertBefore(newDiv, currentDiv); 
  
 // document.write('You searched for "' + searchedWord + '"');
}













//open new connection, using GET request on URL endpoint

/**var url = "https://developers.zomato.com/api/v2.1/restaurant?res_id=RESID";
request.open('GET', url, true);
request.send();
var received = JSON.parse(this.response);
{Need to then access price}
**/
/*** 
request.onload = function (){
// begin accessing json data here
  var data = JSON.parse(this.response);

  data.forEach(movie => {
    //log each title
    console.log(movie.title);
  });
}

// send request
request.send();**/
