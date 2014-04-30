
// Initial courses --------------------

var E140 = new Course(
	'E',
	140,
	'The Study of Literature',
	3,
	['F','S','SS'],
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

var MATH118 = new Course ('MATH',118,'College Algebra in Context II',1,['F','S','SS'],'Reciprocals of linear functions, rational functions, and power functions considered symbolically, graphically, numerically, and contextually. ',[MATH117]);

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
	[MATH118, CS161]
);

var CS160 = new Course (
	'CS',
	160,
	'Foundations in Programming',
	4,
	['F','S'],
	'Introduction to computer theory, programming and systems. Sets, functions, logic. Procedural programming in Java. Computer and data models',
	[MATH118]
);

var CS161 = new Course (
	'CS',
	161,
	'Object-Oriented Problem Solving',
	4,
	['F','S'],
	'Fundamental object oriented concepts, inheritance, polymorphism, basic algorithms, linked lists, assertions, recursion, induction, counting.',
	[CS160]
	//, ['MATH141', 'MATH155', 'MATH160']
);


// var courseList = new CourseCatalog(E140, MATH117, MATH118, CS110, CS122, CS160, CS161);
var comSci = new Major('Computer Science', 'CS', [MATH117, MATH118, CS110, CS122, CS160, CS161]);
var eng = new Major('English', 'E', [E140]);
var math = new Major('Math', 'MATH', [MATH117, MATH118]);

var courseList = [E140, MATH117, MATH118, CS110, CS122, CS160, CS161];
var majorList = [comSci, eng, math];






//----------------------------------------------------------







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
	return course;
};


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
}

// Schedule Constructor
function Schedule (startingYear, numYears) {
	this.allSemesters = [];
	for (var i=0; i<numYears; i++) {
		var fall = 'fall' + (startingYear + i);
		var spring = 'spring' + (startingYear + i + 1);
		this[fall] = [];
		this[spring] = [];
		this.allSemesters.push(fall);
		this.allSemesters.push(spring);
	}
}

// Given a course object, the function will check to see if all of the
// prerequisites are in the schedule prior to the desired semester.
// If the course has no prerequisites, the function will return true.
Schedule.prototype.arePrereqsTaken = function(course, semester) {
	if (course.prereqs === undefined) {
		return true;
	}
	var courseScheduled = false;
	for (var i=0; i<course.prereqs.length; i++) {
		var courseNeeded = course.prereqs[i].courseCode;
		for (key in this) {
			if (this[key] instanceof Array === true) {
				if (filterByCode(this[key], courseNeeded).length > 0) {
					courseScheduled = true;
					var prereqSemester = key;
					if (courseScheduled) {
						console.log('course scheduled');
					}

				}
			}
		}
	}
	console.log(prereqSemester);
	if (courseScheduled) {
		return this.allSemesters.indexOf(prereqSemester) < this.allSemesters.indexOf(semester);
	}
	return false;
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
function filterByName(str) {
	var filteredArray = courseList.filter(function(obj) {
		return obj.name.toLowerCase().indexOf(str.toLowerCase()) !== -1;
	})
	return filteredArray;
}

// Filter through courses, returning the course object that matches the course code
function filterByCode(arr, courseCode) {
	if (arr.length === 0) {
		return arr;
	}
	var filteredArray = arr.filter(function(obj) {
		return obj.courseCode === courseCode;
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
		var currYear = createYear();
		currYear.find('.year-fall').text('Fall ' + (startingYear + i));
		currYear.find('.year-spring').text('Spring ' + (startingYear + i + 1));
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
	var numYears = $('#select-years').val();
	var thisYear = new Date().getFullYear();
	var mySchedule = new Schedule(thisYear, numYears);
	console.log(mySchedule);


// Appends default number of years
	addYears(numYears, thisYear);


// Append years based on select-year value
	$(document).on('change', '#select-years', function() {
		var numYears = $(this).val();
		addYears(numYears, thisYear);
		$('.sortable').sortable();
	})

// Append courses and majors
	$('#required-courses').append(mapCreateCourse(courseList));
	$('#select-major').append(majorList.map(function(major) {
		return major.createMajor();
	}));
	$('#course-listing').append(mapCreateCourse(courseList));
	$('#course-listing').find('.course-description').append('<button id="add-elective-btn" class="btn btn-default btn-xs">Add Elective</button>');


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
		$(this).closest('.course').find('.course-description').toggle();
	});

// Search courses by course name 
	$(document).on('keydown', '#course-search', function() {
		$('#course-listing').empty();
		var search = $(this).val();
		$('#course-listing').append(mapCreateCourse(filterByName(search)));
	});


// Add Course to Electives List
	$(document).on('click', '#add-elective-btn', function() {
		var selectedCourse = $(this).closest('li').clone();
		selectedCourse.find('#add-elective-btn').remove();
		selectedCourse.find('.course-description').hide();
		$('#my-electives').append(selectedCourse);
		$('#my-electives').find('.course').addClass('elective-course');
		$(this).closest('li').find('.course-description').toggle();
	});




$(document).on('sortreceive','.semester',function() {


	// Update Semester Credits
	var credits = $(this).find('.course-credits').text();
	credits = strToSum(credits);
	$(this).closest('.semester').find('.credits').find('span').text(credits);


	// Check prerequisites for each course
	var currSemester = $(this).closest('.semester').find('.semester-label').text().replace(' ','').toLowerCase();
	mySchedule[currSemester] = [];
	
	$(this).find('.course-code').each(function(i) {
		var courseCode = $(this).text().replace(' ','');
		var course = filterByCode(courseList, courseCode)[0];
		mySchedule[currSemester].push(course);
		var prereqsTaken = mySchedule.arePrereqsTaken(course, currSemester);
		if (!prereqsTaken) {
			$(this).closest('.course').addClass('highlight-error');
		}
		if(prereqsTaken) {
			$(this).closest('.course').removeClass('highlight-error');
		}
	});
})

$(document).on('sortremove','.semester', function() {

	var currSemester = $(this).closest('.semester').find('.semester-label').text().replace(' ','').toLowerCase();
	mySchedule[currSemester] = [];

	// Check prerequisites for each course
	$(this).find('.course-code').each(function(i) {
		var courseCode = $(this).text().replace(' ','');
		var course = filterByCode(courseList, courseCode)[0];
		mySchedule[currSemester].push(course);
		var prereqsTaken = mySchedule.arePrereqsTaken(course, currSemester);
		if (!prereqsTaken) {
			$(this).closest('.course').addClass('highlight-error');
		}
		if(prereqsTaken) {
			$(this).closest('.course').removeClass('highlight-error');
		}
	});


})








// Sortable Drag and Drop 
	$('.sortable').sortable();
	$('.sortable, .sortable').sortable({
	    connectWith: '.connected'
	});










});











