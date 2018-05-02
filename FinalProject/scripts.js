//function called if button is clicked
function searched(){
  var searchedWord = document.getElementById("searchTerm").value;
  newElement("div", "You searched for '" + searchedWord +"'", "wrap");
  alert(searchedWord);
    let request = new XMLHttpRequest();
    let url = "https://api.nal.usda.gov/ndb/search/?format=json";
    url+=("&q="+searchedWord);
    url+=("&sort=n&fg=Fast+Foods&api_key=FWaQH04Azwkd2GABmQTRrox5VMNSkhJrHfYpgxMG");
    var searchArea = document.getElementById("results");
    searchArea.innerHTML = "";
    request.onreadystatechange = function() {
      
      if (this.readyState === 4 && this.status === 200) {
        let response = JSON.parse(this.responseText);
        for(var i = 0; i < response.list.item.length; i++){
          searchArea.innerHTML+= JSON.stringify(response.list.item[i].name);
          searchArea.innerHTML+="<br>";
        }
      }
    }
    request.open("GET", url, true);
    request.send();
}

newElement = function(element, elText, prior){
  var newEl = document.createElement(element);   
  var newContent = document.createTextNode(elText); 
  var priorSection = document.getElementById(prior); 
  newEl.appendChild(newContent); 
  document.body.insertBefore(newEl, priorSection);
}


/**EXPLANATION OF WHAT I DID HERE
 * 1) HTML CALLS THE JAVASCRIPT WHEN THE BUTTON IS CLICKED
 * (THE USUAL PROBELM WAS THAT MY FORM WOULD SUBMIT AND REFRESH SO WE RETURN FALSE IN THE HTML)
 * 2) WE GET THE VAUE FROM THE ELEMENT NODE(JUST LIKE LINKED LIST)
 * 3) WE ADD A NEW NODE(LINKED LIST)USING A REFERENCE TO PRIOR
 */