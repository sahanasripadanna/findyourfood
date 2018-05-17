//function called if button is clicked
function searched(){
  document.getElementById("query-1").innerHTML = "";
  //points a reference to the element in the search
  var searchedWord = document.getElementById("searchTerm").value;
  //if (!((searchedWord.equals("")) || (searchedWord.equals(" ")))){
    document.getElementById("searchTerm").value ="";
    newElement("p", "You searched for '" + searchedWord +"'", 'result', 'query-1');

  //uses a function to receive search data from 2 different sources in API
  let x = getResults("Fast+Foods", searchedWord, 0);
    getResults("Restaurant+Foods", searchedWord, x);
  }
//}

//creates an element
//@param: element - type of element
//elText - value of element/ thisname - name of element/ parentElement - parent reference
newElement = function(element, elText,thisname, parentElement){

  //points to new node
  var newEl = document.createElement(element);
  //creates a value
  var newContent = document.createTextNode(elText);
  //sets node's value to newContent
  newEl.appendChild(newContent);
  var parent = document.getElementById(parentElement);
  //sets a reference from the parent element to the new element(so it become a part of webpage)
  parent.appendChild(newEl);
  //sets the names
  newEl.id = thisname;
  return parent.childElementCount;
}

//gathers the data from the api and adds it to the page
getResults = function(foodType, searchedFood, queryStart){
    let j = queryStart;
    var count = 0;
    let request = new XMLHttpRequest();
      let url = "https://api.nal.usda.gov/ndb/search/?format=json";
      url+=("&q="+searchedFood);
      url+=("&sort=n&fg="+ foodType + "&api_key=FWaQH04Azwkd2GABmQTRrox5VMNSkhJrHfYpgxMG");
      //event listener
      request.onreadystatechange = function() {
        //when the API server is ready, receive and add the elements to the page
        if (this.readyState === 4 && this.status === 200) {
          let response = JSON.parse(this.responseText);
          for(var i = 0; i < response.list.item.length; i++){
            //alert(JSON.stringify(response.list.item[i].name));
            count = newElement("p", JSON.stringify(response.list.item[i].name),'query'+j, 'query-1');
            var currElement = document.getElementById('query'+j);
            j++;

            //styling the page through javascript
            currElement.style.height = "175px";
            currElement.style.paddingTop = "12px";
            currElement.style.backgroundColor = "rgb(212,18,116)";
            currElement.style.float = "left";
            currElement.style.width = "49%";
            currElement.style.color = "white";
            //add a button to the search query that can be clicked and create a popup
            currElement.innerHTML+="<br>";
            currElement.innerHTML+='<button type="submit" onclick = "dialog(); return false;" class = "magentabtn"><i class="fa fa-plus-square-o"></i></button>';

            //adds the background picture(*Not working right now)
            
            //addpicture(currElement, currElement.innerText);

            //spacing between the elements
            if((i%2)===1){
              currElement.style.marginLeft = "10px";
            }
          }

          //integer value returned which can prevent overwriting elements
          return count;
        }

      }
      //sends and creates the request
      request.open("GET", url, true);
      request.send();
  }


//function to add a picture from another API
addpicture = function(currElement, imageOf){
  let request = new XMLHttpRequest();
    let url = "https://api.pexels.com/v1/search?query=" + imageOf;
    
    //event listener
    request.onreadystatechange = function() {
      //when the API server is ready, receive and add the elements to the page
      if (this.readyState === 4 && this.status === 200) {
        let response = JSON.parse(this.responseText);
        if(response !== null){
        var picLink = response.photos[0];
        
        //alert(picLink);
        currElement.style.addPictureBackground = "" + picLink + "";
        }
      }
    }
      request.open("GET", url, true);
      url.setRequestHeader("Api-Key", "n2tn9kth8q24t8n2rbzvrhe3");
      //request.setRequestHeader("Authorization", "563492ad6f91700001000001aa4975ce99044329a0e05f0d2f5b3cd0");
      request.send();

}

noresults = function(){
  alert("No results for this keyword");
}

//temporary methods for button click and response
dialog = function(){
  alert("We will bring information to you");
  var modal = document.getElementById('popUp');
  modal.style.display = "block";
}
//popup page
function exit(){
  var modal = document.getElementById('popUp');
  modal.style.display = "none";
}
