
// The dogFrends variable is from the friends.js file that we exported the dogfriends array of objects out of the friends.js file

var dogFriends = require("../data/friends.js");
// requiring the array-sort npm package which sorts an array based on a property https://www.npmjs.com/package/array-sort
var arraySort = require('array-sort');


// ROUTING
// requiring files will help us make our code more modular, meaning if you had another application that was coded like this one, you wouldn't have to duplicate the code 
//you could just require the file in that code  
module.exports = function(app) {


  // API GET Requests
  // Below code handles when users "visit" a page.

  app.get("/api/friends", function(req, res) {
    res.json(dogFriends);
  });


  // API POST Requests
  // Post routes are used anytime data is added to something, 
  //in this case our form responses are being added to the dogFriends array of objects in Friends.js
  // However, before we add that data, we have to use it and the other objects in dogFriends to make another array of objects that will 
  // be the "big reveal" in the app, who your dog friend is. 
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

}

// Here is where the array-sort module comes into play. The first argument is the array of objects that needs to be sorted,
// in this case, the bestDog object that was created out of the data from the api/friends.js file
//The first argument is the array of objects and the second argument is the name of the property that wil be sorted
arraySort(bestDog, 'totalDifference');


//insert current user to the existing tableData
dogFriends.push(currentDog);

//first element of this array of object has the least total difference after sorting in //ascending order
//which is the closest match

console.log(dogFriends);
console.log(`Match: ${bestDog[0].totalDifference}` );
console.log( `Name: ${bestDog[0].name} Image: ${bestDog[0].image}`);
      
     // returns the object we created 
       res.json(bestDog[0]);
    });
   
}

//Activities referenced 
//'HOT RESTAURANT', Trilogy Education Inc. https://nu.bootcampcontent.com/NU-Coding-Bootcamp/NUEVA201809FSF4/tree/master/activities/13-week/16-HotRestaurant/Solved/data
//Philip Loy's code reference document was also helpful in understanding how we needed to manipulate the array of objects wihtin the post function.