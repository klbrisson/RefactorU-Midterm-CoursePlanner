
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
	[CS160, ['MATH141', 'MATH155', 'MATH160']]
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
	this.name = name;
	this.credits = credits;
	this.semesters = semesters;
	this.description = description;
	this.prereqs = prereqs;
}
// Create and return jquery course object
Course.prototype.createCourse = function() {
	var course = $('.course.template').clone();
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


// Returns an array of required courses for the given major in majorList
function findRequiredCourses(major) {
	var filteredArray = majorList.filter(function(obj) {
		return major === obj.name;
	});
	var major = filteredArray[0];
	var majorCourses = major.requiredCourses;
	return majorCourses;
}

// Filter courses by name
function filterByName(name) {
	var filteredArray = courseList.filter(function(obj) {
		return obj.name.toLowerCase().indexOf(name.toLowerCase()) !== -1;
	})
	return filteredArray;
}


// Temporary helper function to map through a given array of courses,
// returning the jquery course objects. - Want to find a better solution
function mapCreateCourse(arr) {
	return arr.map(function(course) {
				return course.createCourse();
	});
}














$(document).on('ready', function() {







	$('.fall').append(MATH117.createCourse());
	$('.spring').append(MATH118.createCourse());
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
		}
	});

// Show course description
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
	$(document).on('click', '#course-list-btn', function() {
	});

	$(document).on('click', '#add-elective-btn', function() {
		var selectedCourse = $(this).closest('li').clone();
		selectedCourse.find('#add-elective-btn').remove();
		selectedCourse.find('#add-elective-btn').remove();
		selectedCourse.find('.course-description').hide();

		$('#my-electives').append(selectedCourse);
		$('#my-electives').addClass('sortable');

		$(this).closest('li').find('.course-description').toggle();
		$("#my-electives").sortable();



	});











	





// Sortable Drag and Drop 
	$("#required-courses").sortable();
	$(".sortable").sortable();
	$('.sortable').sortable({
    forcePlaceholderSize: true 
	});
	$('#required-courses, .fall, .spring').sortable({
	    connectWith: '.connected'
	});










});











