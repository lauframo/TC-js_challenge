// Assignment 1
	//Input- Array of unique numbers given. No empty arrays.
	//Possible edge case: negative numbers
	//Examples:
		//Input: [0, 1, 2] Output: 2
		//Input: [-3, 0, 1] Output: 4

	//Solution 1- * Best Solution * O(n)
		// Input: Array
			// 1. Set minimum and maximum value to the first element of array
			// 2. Iterate through each element in the array
				//If element is greater than the current max value, set the max value to the value of that element
				//If element is less than the current min value, set the min value to the value of that element
			// 3. Subtract max from min to get the greates difference 
		//Output: Integer
		// Efficency: This solution compares each element the maximum and minimum value just once

	// Solution 2- 
		// Input: Array
		//Sort array in ascending order in one function (insertion sort)
			// 1. Iterate through each value in array and compare to the element to its left
			// 2. Since starting at index of 0, the comparison value must be greater than -1 and greater than the first value
				// If conditions met, comparison value is moved to the position of the first value (to the right), the loop decreases comparison index by one and now index to the left is set to the first value and comparison continues with any elements to the left
		//Subtract the first element of sorted array from last element and return difference
		// Output: Integer
		//Efficency: This solution requires taking every element and comparing it to every element before it each time it is being evaluated. Then largest and smallest elements are subtracted. Not efficient. O(O(n^2))


//Solution 1- Most efficient		

function maxSubtraction(collection) {
	var min = collection[0]
	var max = collection[0]
	for (var count = 0; count < collection.length; count ++) {
		if (collection[count] > max) {
			max = collection[count]
		}
		if (collection[count] < min) {
			min = collection[count]
		}
	}
	return max - min
}


//Solution 2- Least efficient

function subtraction(collection) {
	sort(collection);
	return collection[array.length - 1] - collection [0]
}

function sort(collection) {
	for (var index= 0; index < collection.length; index++) {
		var value = collection[index];
		for (var compareValue = index - 1; compareValue > -1 && collection[compareValue] > value; compareValue--) {
			collection[compareValue + 1] = collection[compareValue];
    	}
		collection[compareValue + 1] = value;
    }
	return collection
}

//--------------------------------------------------------//
//--------------------------------------------------------//
//--------------------------------------------------------//


//Assignment 2
	// Variable names are a bit verbose for readability// 
	//Input- Two rectangle objects with their upper left corner coordinate and width and lenght
		//Edge case: Rectangles that share a border- still considered intersecting. **Asked Adriana to confirm on Monday**
		//Examples:
			//Input: rect1, rect2 Output: True
			//Input: rect1, rect5 Output: False
	//Solutions- I ended up coming up with two solutions for this one as well. One inefficient and unnecessarily gathers all the points of the x and y-axis of the rectangle. The other one became obvious after the first one and looking at mapped out rectangles.
	
	//Solution 1-  * Best Solution *
		//Input: two rectangle objects
		// If the length of one of the rectangles finishes to the left before the start(x-coordinate) of the second one OR the inverse is true, return false
		//if the height of one of the rectangles finishes above before the start(y-coordinate) of the second one OR the inverse is true, return false
		//Otherwise, rectangles do intersect

	//Solution 2-
		//Input: two rectangle objects
		//1- Create a range of every point for their y and x axis
		//2- If the horizontal range of the first rectangle has more than one point of the second horizontal hange. If so, these 			elements share a border and do intersect- 
				// return true
			// Else if the vertical range includes more than one point in the second vertical range, the elements share a border and do intersect- 
				// return true
			//Else if the first horizontal range includes the x coordinate of the 2nd rectangle, check if any of the y-axis coordinates in the range is included in the other, then push any matches into a vertical overlap array
			//Else if the first vertical range includes the y coordintaes of the 2nd rectangles, check  if any of the x-xis
				// coordinates in the range is included in the other, then push any matches into a horizontal overlap array
		//3- If the length of any of the arrays is greater than 1, return true


//Solution 1

function intersect(firstRect, secondRect) {
  if (firstRect.x + firstRect.width < secondRect.x || secondRect.x + secondRect.width < firstRect.x) {
    return false
  } else if (firstRect.y + firstRect.height < secondRect.y || secondRect.y + secondRect.height < firstRect.y) {
    return false
  } else {
    return true
  };
}



//Solution 2

function range(coordinate, length) {
	var range = []
	var end = coordinate + length
	for (var start = coordinate;  start <= end; start ++) {
		range.push(start);
	}
	return range;
}



function intersect (firstRect, secondRect) {
    firstRectHorizontal = range(firstRect.x, firstRect.width)
    firstRectVertical = range(firstRect.y, firstRect.height)
    secondRectHorizontal = range(secondRect.x, secondRect.width)
    secondRectVertical = range(secondRect.y, secondRect.height)
	  var verticalOverlap = []
	  var horizontalOverlap = []
	
	if (firstRectHorizontal.includes(secondRect.x) && firstRectHorizontal.includes(secondRect.x + 1)) {
	    return true
	  } else if (firstRectVertical.includes(secondRect.y) && firstRectVertical.includes(secondRect.y + 1)) {
	      return true
	  } else if (firstRectHorizontal.includes(secondRect.x)) {
		    secondRectVertical = secondRectVertical.slice(secondRectVertical.indexOf(firstRect.y))
		    for (var i = 0; i < firstRectVertical.length; i ++) {
			    if (firstRectVertical.includes(secondRectVertical[i])) {
			    verticalOverlap.push(secondRectVertical[i])
            };
         };
       } else if (firstRectVertical.includes(secondRect.y)) {
		      secondRectHorizontal = secondRectHorizontal.slice(secondRectHorizontal.indexOf(firstRect.x))
      		for (var i = 0; i < firstRectHorizontal.length; i ++) {
      			if (firstRectHorizontal.includes(secondRectHorizontall[i])) {
      			horizontalOverlap.push(secondRectHorizontal[i])
               }
        }
       };

	if (verticalOverlap.length > 1 || horizontalOverlap.length > 1) {
		return true;
    } else {
		return false;
    }
};



//--------------------------------------------------------//
//--------------------------------------------------------//
//--------------------------------------------------------//

//Assignment 3
	//Input- Int64 number for a 7-character string. 667734139064
		//Example:
			// Input: 680131662011 Output:"leepdag"
	//Output- string
	//Solution- I tried trying to identify a pattern for each time h was increased within the assignment 3 function by printing out h at each iteration of the loop. Unable to do so, I tried to identify a pattern in operation, seeing  that h is called upon itself each time and multiplied by 37- I tried  trying to figure out a recursive way of reverse engineering the function, thinking the base case could be the strings length (7) but without an index location to start with- I could not figure out a way to do that.

	//1. Input: int64 number
	//2. Write 7 nested loops- one for each character in the string, each loop iterating through each element in the array. I attempeted to dynamically create a loop for the number of characters in the string however did not get there
	//3. Combine all 7 letters into one string 
	//4. If the string at that iteration, when input the assignment3 function, returns 667734139064- break out of loop and return the string.
	//5. Output: "correct"

function stringGuesser(667734139064) {
        var letters = ['a','c','d','e','g','i','l','m','n','o','p','r','s','t','u','w'];
        for (var i = 0; i < letters.length; i++) {
                for (var j = 0; j < letters.length; j++) {
                        for (var k = 0; k < letters.length; k++) {
                                for (var l = 0; l < letters.length; l++) {
                                        for (var m = 0; m < letters.length; m++) {
                                                for (var n = 0; n < letters.length; n++) {
                                                        for (var o = 0; o < letters.length; o++) {
                                                                stringBuilt = letters[i] + letters[j] + letters[k] + letters[l] + letters[m] + letters[n] + letters[o];
                                                                if (assignment3(stringBuilt) == 667734139064) {
                                                                        return stringBuilt;
                                                                }
                                                        }
                                                }
                                        }
                                }
                        }
                }
        }
        return false;
}
