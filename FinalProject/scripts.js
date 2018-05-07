//function called if button is clicked
function searched(){
  document.getElementById("query-1").innerHTML = "";
  //points a reference to the element in the search
  var searchedWord = document.getElementById("searchTerm").value;
  document.getElementById("searchTerm").value ="";
  newElement("p", "You searched for '" + searchedWord +"'", 'result', 'query-1');
  
let x = getResults("Fast+Foods", searchedWord, 0); 
alert(x);
  getResults("Restaurant+Foods", searchedWord, x);
}

//creates an element
newElement = function(element, elText,thisname, parentElement){
  var newEl = document.createElement(element);   
  var newContent = document.createTextNode(elText); 
  newEl.appendChild(newContent);
  var parent = document.getElementById(parentElement);
  parent.appendChild(newEl);
  newEl.id = thisname;
  return parent.childElementCount;
}


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
            currElement.style.height = "175px";
            currElement.style.paddingTop = "12px";
            currElement.style.backgroundColor = "#d41274";
            currElement.style.float = "left";
            currElement.style.width = "49%";
            currElement.style.color = "white";

            currElement.innerHTML+="<br>";
            currElement.innerHTML+='<button type="submit" onclick = "dialog(); return false;"><i class="fa fa-plus-square-o"></i></button>';

            

            addpicture(currElement, currElement.value);
            if((i%2)===1){
              currElement.style.marginLeft = "10px";
            }
          }
          return count;
          alert(x + "babies");
        }
       
        
      }
      //sends and creates the request
      request.open("GET", url, true);
      request.send();
  }


addpicture = function(currElement, imageOf){
  let request = new XMLHttpRequest();
    let url = "https://api.gettyimages.com/v3/search/images?phrase=" + imageOf;
    //url.setRequestHeader("Api-Key", "n2tn9kth8q24t8n2rbzvrhe3");

    //event listener
    request.onreadystatechange = function() {
      //when the API server is ready, receive and add the elements to the page
      if (this.readyState === 4 && this.status === 200) {
        let response = JSON.parse(this.responseText);
        if(response !== null){
        var picLink = response.images[0]; //.display_size[0].uri
        currElement.style.addPictureBackground = picLink;
        }
      }
    }
      request.open("GET", url, true);
      request.setRequestHeader("Api-Key", "n2tn9kth8q24t8n2rbzvrhe3");
      request.send();

}

dialog = function(){
  alert("We will bring information to you");
  var modal = document.getElementById('popUp');
  modal.style.display = "block";
}
close = function(){
  var modal = document.getElementById('popUP');
  modal.style.display = "none";
}
/**EXPLANATION OF WHAT I DID HERE
 * 1) HTML CALLS THE JAVASCRIPT WHEN THE BUTTON IS CLICKED
 * (THE USUAL PROBELM WAS THAT MY FORM WOULD SUBMIT AND REFRESH SO WE RETURN FALSE IN THE HTML)
 * 2) WE GET THE VAUE FROM THE ELEMENT NODE(JUST LIKE LINKED LIST)
 * 3) WE ADD A NEW NODE(LINKED LIST)USING A REFERENCE TO PRIOR
 */