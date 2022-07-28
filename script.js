/*
This is your site JavaScript code - you can add interactivity and carry out processing
- Initially the JS writes a message to the console, and moves a button you can add from the README
*/
var AT_url = "https://api.airtable.com/v0/appSfzhC5ABBvTp2O/RC_data"
var AT_key = "api_key=keySsUNwZfQgXnsjZ"
var SUMMARY_QUERY = "fields%5B%5D=Name&fields%5B%5D=Photo&fields%5B%5D=Information";

function getBSC() {
  var eWRC_Element = document.getElementById("RC center");

  fetch(`${AT_url}?${AT_key}&${SUMMARY_QUERY}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // response is an object w/ .records array

      eWRC_Element.innerHTML = ""; // clear student

      var newHtml = "";

      for (var i = 0; i < data.records.length; i++) {
        var name = data.records[i].fields["Name"];
        var photo = data.records[i].fields["Photo"];
        var info = data.records[i].fields["Address"];
      /*  var num = data.records[i].fields["Number"];
        var link = data.records[i].fields["Website"];
        var desc = data.records[i].fields["Desc"];
        var aD = data.records[i].fields["AcceptedDevices"]
        var methods = data.records[i].fields["methods"];
        var appt = data.records[i].fields["Appointment?"];
        */

        newHtml += `
        
          <div class="col-md-4 cardImageText">
          <div class="card" >
            
              >${photo ? `<img class="head" src="${photo[0].url}">` : ``}
            

            <div class="card-body">
              <p class="card-text card-key">${name}</p>
              <p class="card-text card-key">${info}</p>
             
            </div>
          </div>
        </div>
        
        `;
      }
    
    

       eWRC_Element.innerHTML = newHtml;
    });
}

// edit below
function fetchSingleRC() {
  var eWRC_Element = document.getElementById("RC center");

  fetch(`${AT_URL}/${dogId}?${SUMMARY_QUERY}`)
    .then(response => response.json())
    .then(data => {
      console.log(data); // response is a single object

      var dogPic = data.fields["Picture URL"];
      var dogName = data.fields["Name"];
      var dogDescription = data.fields["Description"];
 
      var colorsHtml = "";
      if ("Colors" in data.fields) {
        colorsHtml += "<ul>";
        var dogColors = data.fields["Colors"].split(", ");
        for (var i = 0; i < dogColors.length; i++) {
          colorsHtml += `<li>${dogColors[i]}</li>`;
        }
        colorsHtml += "</ul>";
      }

      var newHtml = `
        <div class="col-9">
          <div class="card">
            <h4 class="card-title">${dogName}</h4>
            <h5>Colors</h5>
            ${colorsHtml}
            <h5>Description</h5>
            <p>${dogDescription}</p>
          </div>
        </div>
        <div class="col">
          <img src="${dogPic}" alt="picture of a ${dogName} doggie">
        </div>
      `;

      dogResultElement.innerHTML = newHtml;
    });
}
//edit above

var idParams = window.location.search.split("?id=");
if (idParams.length >= 2) {
  // has at least ["id?", "OUR ID"]
  getSingleDirectory(idParams[1]); // create detail view HTML w/ our id
} else {
  getBSC(); // no id given, fetch summaries
}
