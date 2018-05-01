
function searched(){
  var searchedWord = document.getElementById("searchTerm").value;
  alert(searchedWord);
 
    // create a new element 
    var newElement = document.createElement("div"); 
    // give it content 
    var newContent = document.createTextNode("You searched'" + searchedWord+"'"); 
    // add the text node to the new element
    newDiv.appendChild(newContent);  
    // add the new element into the dom by linking to a prior non
    var priorSection = document.getElementById("wrap"); 
    document.body.insertBefore(newDiv, priorSection); 
}

/**EXPLANATION OF WHAT I DID HERE
 * 1) HTML CALLS THE JAVASCRIPT WHEN THE BUTTON IS CLICKED
 * (THE USUAL PROBELM WAS THAT MY FORM WOULD SUBMIT AND REFRESH SO WE RETURN FALSE IN THE HTML)
 * 2) WE GET THE VAUE FROM THE ELEMENT NODE(JUST LIKE LINKED LIST)
 * 3) WE ADD A NEW NODE(LINKED LIST)USING A REFERENCE TO PRIOR
 */











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
