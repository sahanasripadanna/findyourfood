//function called if button is clicked
function searched(){
  document.getElementById("query-1").innerHTML = "";
  //points a reference to the element in the search
  var searchedWord = document.getElementById("searchTerm").value;
    document.getElementById("searchTerm").value ="";
    newElement("p", "You searched for '" + searchedWord +"'", 'result', 'query-1');

  //uses a function to receive search data from 2 different sources in API
  getResults("Fast+Foods", searchedWord, 0);
  getResults("Restaurant+Foods", searchedWord, 1000);
  }

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
}

//gathers the data from the api and adds it to the page
getResults = function(foodType, searchedFood, queryStart){
    let j = queryStart;
    let request = new XMLHttpRequest();
      let url = "https://api.nal.usda.gov/ndb/search/?format=json";
      url+=("&q="+searchedFood);
      url+=("&sort=n&fg="+ foodType + "&api_key=FWaQH04Azwkd2GABmQTRrox5VMNSkhJrHfYpgxMG");
      //event listener
      request.onreadystatechange = function() {
        //when the API server is ready, receive and add the elements to the page
        if (this.readyState === 4 && this.status === 200) {
          let response = JSON.parse(this.responseText);
          for(var i = 0; i < JSON.stringify(response.list.item.length); i++){
            //alert(JSON.stringify(response.list.item[i].name));
            newElement("p", JSON.stringify(response.list.item[i].name),'query'+j, 'query-1');
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
            currElement.innerHTML+='<button type="submit" onclick = "dialog('+(j-1)+'); return false;" class = "magentabtn"><i class="fa fa-plus-square-o"></i></button>';
            //spacing between the elements
            if((i%2)===1){
              currElement.style.marginLeft = "10px";
            }
          }
        }
      }
      //sends and creates the request
      request.open("GET", url, true);
      request.send();
  }

//opens the popup page if button is clicked
dialog = function(x){
  var searchKey = document.getElementById('query' + x + '');
  var term = searchKey.innerText;
  var modal = document.getElementById('popUp');
  modal.style.display = "block";
  var fixed = isolateName(term);
  document.getElementById("innerText").innerText = term.substring(1, term.length - 2);
  postToPopUp(fixed);
} 

//closes the popup page if 'x' is click
function exit(){
  var modal = document.getElementById('popUp');
  modal.style.display = "none";
}


//takes data from the API and adds it to the popup page
function postToPopUp(keyWord){
  let bodyText = document.getElementById("innerText");
  let headBanner = document.getElementById('banner');
  headBanner.innerText = keyWord;
  if(keyWord.search("School Lunch") !== -1){
    //adds default image and text for generic school lunch query
    bodyText.innerHTML+= '<img src = "schoolLunch.png" alt = "school Lunch" style = "width : 50%; height : 50;">';

  }else if((keyWord.search("Fast foods")!== -1) || (keyWord.search("Fast Food") !== -1)){
    bodyText.innerHTML+= '<img src = "fastfood.png" alt = "fast food" style = "width : 30%; height : 30;">';
  }else{
  let placeId = "";
  let request = new XMLHttpRequest();
  let url = "https://api.foursquare.com/v2/venues/search/?near=Los+Angeles&query=";
  url+=keyWord;
  url+="&limit=1&client_id=NBVZZZSD5QBEA2SWONO22JHPQ3YUDJAHT3N4U4JYUSDSP0D3&client_secret=KP5HBRJX2Z3R3FJFJSMFT0SEGBN4TFRCZETYLKANOL5UMLCF&v=20180522";
  request.onreadystatechange = function() {
    //when the API server is ready, receive and add the elements to the page
    if (request.readyState === 4 && request.status === 200) {
      let response = JSON.parse(request.responseText);
      placeId = JSON.stringify(response.response.venues[0].id);
      alert(placeId);
    }
  }
      request.open("GET", url, true);
      request.send();
      let name = placeId.substring(1, placeId.length-2);
  let getInfo = new XMLHttpRequest();
  let link = "https://api.foursquare.com/v2/venues/";
  let popUpText= document.getElementById('innerText');
  link+=name;
  link+="?client_id=NBVZZZSD5QBEA2SWONO22JHPQ3YUDJAHT3N4U4JYUSDSP0D3&client_secret=KP5HBRJX2Z3R3FJFJSMFT0SEGBN4TFRCZETYLKANOL5UMLCF&v=20180522";
  getInfo.onreadystatechange = function(){
    //when the API server is ready, receive and add the elements to the page
    if(getInfo.readyState === 4 && getInfo.status === 200){
      let getInfo = JSON.parse(request.responseText);
      popText.innerText+=  JSON.stringify(getInfo);
      
    }
  }
}
}

//isolates only the store brand name, not the food and the place - removes the " " and ,
function isolateName(keyWord){
let comma = keyWord.indexOf(",");
let newWord = keyWord.substring(1, comma);
return newWord;
}
