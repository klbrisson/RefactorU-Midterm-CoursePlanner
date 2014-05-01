
// Initial courses --------------------

var E140 = new Course(
	'E',
	140,
	'The Study of Literature',
	3,
	['F'],
	'Basic principles of reading literary texts.'
);


var MATH117 = new Course(
	'MATH',
	117,
	'College Algebra in Context I',
	1,
	['F','S','SS'],
	'Functions as mathematical models. Linear, quadratic, and polynomial functions considered symbolically, graphically, numerically, and contextually.'
);

var MATH118 = new Course (
	'MATH',
	118,
	'College Algebra in Context II',
	1,
	['S','SS'],
	'Reciprocals of linear functions, rational functions, and power functions considered symbolically, graphically, numerically, and contextually. ',
	['MATH117']
);

var MATH141 = new Course(
	'MATH',
	141,
	'Calculus in Management Sciences',
	3,
	['F','S','SS'],
	'Analytic geometry, limits, equilibrium of supply and demand, differentiation, integration, applications of the derivative, integral.',
	['MATH118']
	);

var MATH155 = new Course(
	'MATH',
	155,
	'Calculus for Biological Scientists I',
	4,
	['F','S','SS'],
	'Limits, continuity, differentiation, and integration of elementary functions with applications in the biosciences. Programmable graphing calculator required. '
	//,['MATH124','MATH125']
	)

var MATH160 = new Course(
	'MATH',
	160,
	'Calculus for Physical Scientists I',
	4,
	['F','S','SS'],
	'Limits, continuity, differentiation, and integration of elementary functions with applications; conic sections.'
	//,['MATH124','MATH126']
	)




var CS110 = new Course (
	'CS',
	110,
	'Personal Computing',
	4,
	['F','S','SS'],
	'Hardware/software concepts, Internet services, OS commands, electronic presentations, spreadsheets, databases, programming concepts.'
);

var CS122 = new Course (
	'CS',
	122,
	'Theory for Introductory Programming',
	1,
	['F','S'],
	'Set theory, definitions operations, Venn diagrams, power sets, propositional logic and proofs. Functions; loop invariants',
	['MATH118', 'CS161']
);

var CS150 = new Course (
	'CS',
	150,
	'Interactive Programming with Java',
	4,
	['F','S'],
	'Introduction to object-oriented programming with Java; problem solving, creating applets for Web pages, and graphical user interfaces.'
	//Placement into MATH 117 or MATH 130. 
	)

var CS160 = new Course (
	'CS',
	160,
	'Foundations in Programming',
	4,
	['F','S'],
	'Introduction to computer theory, programming and systems. Sets, functions, logic. Procedural programming in Java. Computer and data models',
	['MATH118']
);

var CS161 = new Course (
	'CS',
	161,
	'Object-Oriented Problem Solving',
	4,
	['F','S'],
	'Fundamental object oriented concepts, inheritance, polymorphism, basic algorithms, linked lists, assertions, recursion, induction, counting.',
	['CS160',['MATH141', 'MATH155', 'MATH160']]
);

var ART100 = new Course (
	'ART',
	100,
	'Introduction to the Visual Arts',
	3,
	['F','S','SS'],
	'Exploration of the development of visual arts.'
);



var ART101 = new Course (
	'ART',
	101,
	'Visual Form',
	3,
	['F','S','SS'],
	'Two- and three-dimensional design to develop visual awareness and insight into structure and organization of visual arts.'
);

var ART105 = new Course (
	'ART',
	105,
	'Issues and Practices in Art',
	1,
	['F','S'],
	'Current issues, practices, and resources in the visual arts; integration of unified vocabulary in various art disciplines.'
);



// var courseList = new CourseCatalog(E140, MATH117, MATH118, CS110, CS122, CS160, CS161);
var comSci = new Major('Computer Science', 'CS', [MATH117, MATH118, CS110, CS122, CS160, CS161]);
var eng = new Major('English', 'E', [E140]);
var math = new Major('Math', 'MATH', [MATH117, MATH118, MATH160]);
var art = new Major('Art', 'ART', [ART100, ART101, ART105]);


var courseList = [E140, MATH117, MATH118, MATH141, MATH155, MATH160, CS110, CS122, CS150, CS160, CS161, ART100, ART101, ART105];

var majorList = [comSci, eng, math, art];

// var E = new Department('E', 'English');
// var MATH = new Department('MATH', 'Math');
// var CS = new Department('CS', 'Computer Science');
// var ART = new Department('ART', 'Art');

// var deptList = [E, MATH, CS, ART];



//----------------------------------------------------------

// // Department constructor
// function Department (code, name) {
// 	this.name = name;
// 	this.code = code;
// 	this.courses = [];
// }

// Department.prototype.addCourse = function(course) {
// 	if (course.department === this.code) {
// 		this.courses.push(course);
// 	}
// };

// Department.prototype.createDeptCourseList = function() {
// 	for (var i=0; i<this.courses.length; i++) {

// 	}
// };




// Convert 24-hour Number to 12-hour String and
// Converts 12-hour String to 24-hour Number
// ** Currenly only works for hours **
function convertTime(time) {
	var amPm;
	var time12;
	var time24;
	var timeString;

	// Converts 24-hour Number to a string
	if (typeof time === 'number') {
		if (time < 0 || time > 23) {
			throw new Error('Time out of range. Must be between 0 and 23 (inclusive)');
		}
		time24 = time;
		amPm = time24 < 12 ? 'am' : 'pm';
		time12 = time24 <= 12 ? time24 : time24 - 12;
		timeString = time24 === 0 ? '12:00 am' : time12 + ':00 ' + amPm;
		console.log(timeString);
		return timeString;
	}
	// Converts String to 24-hour Number
	else if (typeof time === 'string') {
		// Accepts formats 'hh:mm xm' or 'h:mm xm' or 'h: xm'
		timeString = time;
		time12 = +timeString.slice(0,timeString.indexOf(':'));
		amPm = timeString.slice(timeString.length -2).toLowerCase();
		if (amPm !== 'am' && amPm !== 'pm') {
			throw new Error('Time format is incorrect. convertTime() accepts "hh:mm xm" or "h:mm xm" or "h: xm"');
		}
		if (time12 === 12) {
			return amPm === 'am' ? 0 : 12;
		}
		time24 = amPm === 'am' ? time12 : time12 + 12;
		return time24;
	}
}

// Finds and returns the object in a list associated with the given name, ignoring case
function findObject(list, name) {
	var filteredList = list.filter(function(obj) {
		return name.toLowerCase() === obj.name.toLowerCase();
	});
	return filteredList[0];
}

//----------------------- COURSE -------------------------
// Course constructor
function Course (department, code, name, credits, semesters, description, prereqs) {
	this.department = department;
	this.code = code;
	this.courseCode = department + code;
	this.name = name;
	this.credits = credits;
	this.semesters = semesters;
	this.description = description;
	this.prereqs = prereqs;
}

// Create and return jquery course object
Course.prototype.createCourse = function() {
	var course = $('.course.template').clone();
	course.find('.course-code').text(this.department + ' ' + this.code);
	course.find('.course-name').text(this.name);
	course.find('.course-credits').text(this.credits);
	course.find('.course-description').text(this.description);
	course.removeClass('template');

	if (this.prereqs !== undefined) {
		var prerequisites = this.prereqs.join(', ');
		course.find('.course-prerequisites').text(prerequisites);
	}
	var semOffered = this.semesters.join(', ');
	course.find('.course-semesters').text(semOffered);
	return course;
};


//----------------------- MAJOR -------------------------

// Major constructor
function Major (name, department, requiredCourses) {
	this.name = name;
	this.department = department;
	this.requiredCourses = requiredCourses;
}
// Create and return jquery option for majors
Major.prototype.createMajor = function() {
	var major = $('<option></option>');
	major.text(this.name);
	return major;
};



//----------------------- SCHEDULE -------------------------

// Schedule Constructor
function Schedule (startingYear, numYears) {
	this.allSemesters = [];
	for (var i=0; i<numYears; i++) {
		var fall = 'sem-fall' + (startingYear + i);
		var spring = 'sem-spring' + (startingYear + i + 1);
		this[fall] = [];
		this[spring] = [];
		this.allSemesters.push(fall);
		this.allSemesters.push(spring);
	}
}

//TODO: refactor into smaller, more organized function
// Given a course object, the function will check to see if all of the
// prerequisites are in the schedule prior to the desired semester.
Schedule.prototype.arePrereqsTaken = function(course, courseSemester) {
	// If the course has no prerequisites, the function will return true.
	if (course.prereqs === undefined) {
		return true;
	}

	var numPrereqsFullfilled = 0;
	var prereqFullfilled = false;


	for (var i=0; i<course.prereqs.length; i++) {
		var courseNeeded = course.prereqs[i];

		for (key in this) {
			// checks if the object key is a semester rather than a function or the array of allSemesters
			// checks if the semester with the prerequisite comes before the semester with the course
			var keyIsSemester = key.indexOf('sem-') !== -1;
			var prereqIsBeforeCourse = this.allSemesters.indexOf(key) < this.allSemesters.indexOf(courseSemester);
			var semester = this[key];

			if (keyIsSemester && prereqIsBeforeCourse){

				// If a student can take any one course in an array to fulfill a prerequisite,
				// map through the array to create an array of boolean values. If any item is
				// true, increase numPrereqsFullfilled by one
				if (courseNeeded instanceof Array) {
					var prereqBoolArray = courseNeeded.map(function(j) {
						return filterByCode(semester, j).length > 0;
					});
					if (prereqBoolArray.indexOf(true) !== -1 && !prereqFullfilled){
						numPrereqsFullfilled++;
						prereqFullfilled = true;
					}
				}

				// If the courseNeeded is not an array of prerequisites, increment the numPrereqsFullfilled
				else {
					var prereqIsInSemester = filterByCode(this[key], courseNeeded).length > 0;
					if (prereqIsInSemester){
						numPrereqsFullfilled++;
					}

				}
			}
		}
	}
	return numPrereqsFullfilled === course.prereqs.length ? true : false;
};

// Checks if the course is offered that semester and returns true or false
Schedule.prototype.isCourseOffered = function(course, courseSemester) {
	currSemester = courseSemester.charAt(4).toUpperCase();
	return ( course.semesters.indexOf(currSemester) !== -1 );
};





// Returns an array of required courses for the given major in majorList
function findRequiredCourses(major) {
	var filteredArray = majorList.filter(function(obj) {
		return major === obj.name;
	});
	var major = filteredArray[0];
	var majorCourses = major.requiredCourses;
	return majorCourses;
}

// Filter through course names, returning an array of any courses that
// have names containing the given string
function searchForCourse(list, str) {
	var filteredArray = list.filter(function(obj) {
		return obj.name.toLowerCase().indexOf(str.toLowerCase()) !== -1 ||
		obj.courseCode.toLowerCase().indexOf(str.toLowerCase().replace(' ','')) !== -1 ?
		true : false;
	})
	return filteredArray;
}

// Filter through courses, returning the course object that matches the course code
function filterByCode(list, courseCode) {
	if (list.length === 0) {
		return list;
	}
	var filteredArray = list.filter(function(obj) {
		return obj.courseCode === courseCode;
	})
	return filteredArray;
}




// Filters courses, removing any major required courses, returning a new filtered array
function filterOutMajorCourses(list, major) {
	if (major === undefined) {
		return [];
	}
	var filteredArray = list.filter(function(course) {
		return major.requiredCourses.indexOf(course) === -1;
	})
	return filteredArray;
}


// Creates and returns a year element
function createYear() {
	var year = $('.year.template').clone();
	year.removeClass('template');
	year.find('.course.template').remove();
	return year;
}

// Append desired number of years to #years-container
function addYears(numYears, startingYear) {
	$('#years-container').empty();
	for (var i=0; i<numYears; i++) {
		var fall = 'Fall ' + (startingYear + i);
		var spring = 'Spring ' + (startingYear + i + 1);
		var currYear = createYear();
		currYear.find('.year-fall').text(fall);
		currYear.find('.year-spring').text(spring);
		currYear.find('.credits').eq(0).find('span').addClass('credits-sem-' + fall.toLowerCase().replace(' ',''));
		currYear.find('.credits').eq(1).find('span').addClass('credits-sem-' + spring.toLowerCase().replace(' ',''));
		$('#years-container').append(currYear);
	}
}

// Temporary helper function to map through a given array of courses,
// returning the jquery course objects. - Want to find a better solution
function mapCreateCourse(arr) {
	return arr.map(function(course) {
				return course.createCourse();
	});
}

// takes a string of numbers and returns the sum of the numbers as a number
function strToSum(str) {
	if (str === '') {
		return 0;
	}
	var arr = str.split('');
	var isNumber = true;
	arr = arr.map(function(i){
		if (typeof +i !== 'number'){
			isNumber = false;
		}
		return +i;
	})
	var num = arr.reduce(function(a,b) {
		return a + b;
	})
	return num;
}







$(document).on('ready', function() {
	var thisYear = new Date().getFullYear();

// Add years to starting year selector
	for (var i = thisYear-10; i <= thisYear+10; i++){
		if (i === thisYear){
			$('#starting-year').append('<option selected="selected">' + i + '</option>');
		}
		else {
			$('#starting-year').append('<option>' + i + '</option>');
		}
	}

// Default number of years and starting year
	var startingYear = +$('#starting-year').val();
	var numYears = +$('#select-years').val();
	var mySchedule;
	updateYears();

// updates the display and mySchedule to new starting-year and select-years values	
	function updateYears() {
		startingYear = +$('#starting-year').val();
		numYears = +$('#select-years').val();
		addYears(numYears, startingYear);
		mySchedule = new Schedule(startingYear, numYears);
		console.log(mySchedule);
		$('.sortable').sortable();
		$('.sortable, .sortable').sortable({
		    connectWith: '.connected'
		});
	}


// Update mySchedule on change of starting year
	$(document).on('change','#starting-year', function() {
		updateYears();
	});


// Append years based on select-year value and update mySchedule
	$(document).on('change', '#select-years', function() {
		updateYears();
	})








function highlightErrors(schedule) {
	$('#years-container').find('.course-code').each(function(i) {
		var courseCode = $(this).text().replace(' ','');
		var course = filterByCode(courseList, courseCode)[0];
		var currSemester = 'sem-' + $(this).closest('.semester').find('.semester-label').text().replace(' ','').toLowerCase();
		schedule[currSemester].push(course);
		var prereqsTaken = mySchedule.arePrereqsTaken(course, currSemester);
		if (!prereqsTaken) {
			$(this).closest('.course').addClass('highlight-error');
			$(this).closest('.course').find('.prereq-error').show();
		}
		var offeredInSemester = mySchedule.isCourseOffered(course, currSemester);
		if (!offeredInSemester) {
			$(this).closest('.course').addClass('highlight-error');
			$(this).closest('.course').find('.semester-error').show();
		}

	});
}





// Append courses and majors to lists
	$('#required-courses').append(mapCreateCourse(courseList));
	$('#select-major').append(majorList.map(function(major) {
		return major.createMajor();
	}));


// Display Required Courses Based On Major
	$(document).on('change', '#select-major', function() {
		var majorName = $(this).val();
		$('#required-courses').empty();
		// Show all courses if "Select Major" was selected
		if (majorName === 'Select Major') {
			$('#required-courses').append(mapCreateCourse(courseList));
			return;
		}
		// Filter course list for selected major and add required courses to list
		else {
			var majorCourses = findRequiredCourses(majorName);
			$('#required-courses').append(mapCreateCourse(majorCourses));
			$('#required-courses').find('.course').addClass('required-course');
		}
	});

// Show course description on click
	$(document).on('click', '.course-name', function() {
		$(this).closest('.course').find('.course-info').toggle();
	});



// Clear the modal courses, and re-append courseList
$(document).on('click','#course-list-btn', function() {
	var selectedMajor = findObject(majorList, $('#select-major').val());
	$('#elective-search').closest('form')[0].reset();

	if (selectedMajor !== undefined) {
		var electivesList = filterOutMajorCourses(courseList, selectedMajor);
		$('#course-listing').empty();
		$('#course-listing').append(mapCreateCourse(electivesList));
		$('#course-listing').find('.course-info').append('<div><button class="add-elective-btn btn btn-default btn-xs">Add Elective</button></div>');
	}
});



// Search electives in modal by course name 
	$(document).on('keyup', '#elective-search', function() {
		var selectedMajor = findObject(majorList, $('#select-major').val());

		if (selectedMajor !== undefined) {
			var electivesList = filterOutMajorCourses(courseList, selectedMajor);
			$('#course-listing').empty();
			var search = $(this).val();
			$('#course-listing').append(mapCreateCourse(searchForCourse(electivesList, search)));
			$('#course-listing').find('.course-info').append('<div><button class="add-elective-btn btn btn-default btn-xs">Add Elective</button></div>');
		}
	});

// Search required courses by course name 
	$(document).on('keyup', '#course-search', function() {
		var selectedMajor = findObject(majorList, $('#select-major').val());
		var searchRequiredCourses = selectedMajor === undefined ? courseList : selectedMajor.requiredCourses;
		$('#required-courses').empty();
		var search = $(this).val();
		$('#required-courses').append(mapCreateCourse(searchForCourse(searchRequiredCourses, search)));
		if (selectedMajor !== undefined) {
			$('#required-courses').find('.course').addClass('required-course');
		}
	});

// Add Course to Electives List
	$(document).on('click', '.add-elective-btn', function() {
		var selectedCourse = $(this).closest('li').clone();
		selectedCourse.find('.course-info').hide();
		$('#my-electives').append(selectedCourse);
		$('#my-electives').find('.course').addClass('elective-course');
		$(this).closest('li').find('.course-info').toggle();
	});








// Update displayed credits, reset course classes and empty mySchedule
$(document).on('sortreceive','.semester',function() {
	var currSemester = 'sem-' + $(this).find('.semester-label').text().replace(' ','').toLowerCase();

	// Update Semester Credits
	var credits = $(this).closest('.semester').find('.course-credits').text();
	credits = strToSum(credits);
	$(this).closest('.year').find('.credits-' + currSemester).text(credits);

	// Reset course classes and empty semester arrays in mySchedule
	$('.course').removeClass('highlight-error');
	$('.course').find('.semester-error').hide();
	$('.course').find('.prereq-error').hide();
	$('.semester').each(function(i) {
		mySchedule[currSemester] = [];
	});

	// Highlight any prerequisite errors
	highlightErrors(mySchedule);
});





$(document).on('sortremove','.semester', function() {
	var currSemester = 'sem-' + $(this).find('.semester-label').text().replace(' ','').toLowerCase();

	// Update Semester Credits
	var credits = $(this).closest('.semester').find('.course-credits').text();
	credits = strToSum(credits);
	$(this).closest('.year').find('.credits-' + currSemester).text(credits);


	// Reset course classes and empty semester arrays in mySchedule
	$('.course').removeClass('highlight-error');
	$('.course').find('.prereq-error').hide();
	$('.course').find('.semester-error').hide();
	$('.semester').each(function(i) {
		mySchedule[currSemester] = [];
	});

	// Highlight any prerequisite errors
	highlightErrors(mySchedule);

});















//------------------------ Weekly Schedule ------------------

// Creates and returns a time select option
//TODO: fix when time is midnight
function createTimeOption (time24) {
	var amPm = time24 < 12 ? 'am' : 'pm';
	var time12 = time24 <= 12 ? time24 : time24 - 12;
	var timeStr = time12 + ':00 ' + amPm;
	if (time24 === 12) {
		var timeOption = $('<option selected="selected">'+ timeStr +'</option>');
	}
	else {
		var timeOption = $('<option>'+ timeStr +'</option>');
	}
	return timeOption;
}

// Appends time options
function addTimeOptions (selectID) {
	for(var i=5; i<24; i++) {
		$(selectID).append(createTimeOption(i));
	}
}

addTimeOptions('#start-time');
addTimeOptions('#end-time');


// Creates and returns a clone of the hour template,
// removing the template class and adding the given time as text
function createHour (time) {
	var hour = $('.hour.template').clone();
	hour.find('.time').text(time);
	hour.removeClass('template');
	return hour;
}

// Will call createHour and append each returned hour to the week
// given a starting hour and ending hour (24-hour format)
function addHours (startHour, endHour) {
	$('.week-container').empty();
	for (var i = startHour; i <= endHour; i++) {
		var amPm = i < 12 ? 'am' : 'pm';
		var time = i <= 12 ? i : i - 12;
		var timeStr = time + ':00 ' + amPm;
		$('.week-container').append(createHour(timeStr));
	}
}

// adds default starting hours
addHours(8, 18);



$(document).on('change','#start-time', function() {
	var startTime = convertTime($('#start-time').val());
	var endTime = convertTime($('#end-time').val());
	addHours(startTime, endTime);
})



$(document).on('change','#end-time', function() {
	var startTime = convertTime($('#start-time').val());
	var endTime = convertTime($('#end-time').val());
	addHours(startTime, endTime);
})


// Sortable Drag and Drop (applies to all pages)
	$('.sortable').sortable();
	$('.sortable, .sortable').sortable({
	    connectWith: '.connected'
	});




//End of $(document).on('ready');
});




















































