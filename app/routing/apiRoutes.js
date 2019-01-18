
// The dogFrends variable is from the friends.js file that we exported the dogfriends array of objects out of the friends.js file

var dogFriends = require("../data/friends.js");
var arraySort = require('array-sort');


// ROUTING
// requiring files will help us make our code more modular, meaning if you had another application that was coded like this one, you wouldn't have to duplicate the code 
//you could just require the file in that code  
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
    // Our "server"  will respond to requests and get the current user's info
    // req.body is available since we're using the body parsing middleware this variable will get the the object array from the friends.js file
   var currentDog =req.body;


//the object compared against the other objects in friends.js will be stored here, in the bestDog array of objects
var bestDog = [];
var results = 0;
//iterates through the array of objects
for (var i = 0; i < dogFriends.length; i++) {

   //reset the results so it won't retain the previous total scores difference
   var results = 0;
   //iterates through the dog friends object, but specifcally answers to the survey questions stored in responseArr
   for (var j = 0; j < dogFriends[i].responseArr.length; j++) {
        //the results variable is assigned to the to the calculation that subtracts the values in the arrays (after they've been turned into integers) 
       results += parseInt(currentDog.responseArr[j]) - parseInt(dogFriends[i].responseArr[j]);

   }
   //Then it will put each object with the total difference into the bestdog array of objects
   bestDog.push({ name: dogFriends[i].name, image: dogFriends[i].image, totalDifference: Math.abs(results) });

}//end outer for loop

//reference: https://www.npmjs.com/package/array-sort
//this npm package allows you to sort the array of object.
//The first argument would is the array of objects that needs to be sorted, in this case, the bestDog object that was created out of the date from the api/friends.js file
//be the array of objects and the second argument would be your property name to //be sorted in ascending order
arraySort(bestDog, 'totalDifference');


//insert current user to the existing tableData
dogFriends.push(currentDog);

//first element of this array of object has the least total difference after sorting in //ascending order
//which is the closest match
//return res.json(storeTotaldifference[0]);

console.log(dogFriends);

console.log("Match:"+bestDog[0].totalDifference );
console.log("name:"+bestDog[0].name +" image: "+ bestDog[0].image );
      
     // returns the object we created 
       res.json(bestDog[0]);
    });
   
}