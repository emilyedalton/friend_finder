
// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var dogFriends = require("../data/friends.js");
var arraySort = require('array-sort');


// ===============================================================================
// ROUTING
// ===============================================================================
module.exports = function(app) {


  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(dogFriends);
  });


  
app.post("/api/friends", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
   var userCurrentdata =req.body;

//tableData
//this is an object 
var storeTotaldifference = [];
var results = 0;
for (var i = 0; i < dogFriends.length; i++) {

   //reset the results so it won't retain the previous total scores difference
   var results = 0;
   for (var j = 0; j < dogFriends[i].responseArr.length; j++) {
       results += parseInt(userCurrentdata.responseArr[j]) - parseInt(dogFriends[i].responseArr[j]);

   }
   //after subtracting, it will sum all the differences and put it in results
   // Math.abs(results) will get rid of negative integers.
   //Then it will put each object with total difference
   // in a separate array of object called storeTotaldifference
   storeTotaldifference.push({ name: dogFriends[i].name, image: dogFriends[i].image, totalDifference: Math.abs(results) });

}//end outer for loop

//reference: https://www.npmjs.com/package/array-sort
// need to do npm install array-sort
//this npm package allows you to sort the array of object.
//The first argument would
//be the array of objects and the second argument would be your property name to //be sorted in ascending order
arraySort(storeTotaldifference, 'totalDifference');


//insert current user to the existing tableData
dogFriends.push(userCurrentdata);

//first element of this array of object has the least total difference after sorting in //ascending order
//which is the closest match
//return res.json(storeTotaldifference[0]);

console.log(dogFriends);

console.log("Match:"+storeTotaldifference[0].totalDifference );
console.log("name:"+storeTotaldifference[0].name +" image: "+ storeTotaldifference[0].image );
      // dogFriends.push(req.body);
      
     // gets the last object that was insert from the client form
       res.json(storeTotaldifference[0]);
    });
   
}