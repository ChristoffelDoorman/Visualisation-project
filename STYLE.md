# Style Guide

The following guidelines are followed about the ordening and sturcrute of the Github repository and the guidlines of code:

## Github repository
The github repository contains four directories:
* data: this directory contains all the raw data sets, some cleaned up for better processing.
* doc: this directory contains all images, sketches and formatted text files.
* project: this directory contains all files necessary for the visualisation to work. The directory has three subdirectories:
  * javascript: this directory contains all javascript files used in the application. In addition, the used libraries are stored in the directory 'libraries'.
  * data: this directory contains all the json files with data used in the application.
  * css: this directory contains all style sheets for the visualisation.
* scripts: this directory contains the scripts that are used to convert the raw-data files into useful json files.

Beside these directories, the repository contains a licence file, a 'process'-file that describes the process of the project day by day, a readme file, this styleguide, a 'design' file about the design of the project and the html file (index.html).


## Code
The project contains scripts in four different languages: Javascript, CSS, HTML and Python. Each file contains a header, all in the same structure:

```
Title of the file

Programmeerproject  
Minor Programmeren (UvA)  
Autor  
Student number

Short description of the file
```

Below, the guidelines for each different coding language are beeing displayed:

### Javascript

#### Variable names and whitespaces around operators
Use camelCase for variables with multiple words. Use whitespace around operators ( = + - * / ), en after comma's.

```
var previousValue = (currValue * 3) / 2;
```

#### Indentation, statement closure and quotationmarks
Always use four spaces as indentation and end simple statements with a semicolon. Use single quotationmarks, except around strings inside strings.

```
var numbers = ['Vife is called a "5"', 'Three', 'One'];

var adress = {
    city: 'London',
    postal: '17887'
};
```

#### Loops
```
for (var i = 0; i < 5; i++) {
    x -= i;
}
```

#### Conditionals
```
if (condition) {
    action2
}
if {
    action2
}
```
Use !-marks to indicate a false condition: `!x` instead of `x == false`. In order to check the existence of an object, make a condition comparing the object with `null`. Compare numbers with `0` and strings with `""`. 

Short if/else statements may be used with an `?` operator:

```
return condition ? action1 : action2;
```


#### line length
If a statement takes more than 80 characters, a new line has to be included after an operator, if possible.

#### Comments
Each comment has to be stated on a new line, starting with two `//` and a white space. Short single-line comments are used to describe the statement beneath it and do not start with a capital letter, and do not end with a point. Multi-line comments are used in the header to describe the file, or in functions to describe the fuction. These multi-line comments do start with a capital letter and end with a point.

```
// this is a single-line comment

// Even long comments that span
// multiple lines use the single
// line comment form, but with a
// capital letter and a point.

```

### CSS
Sort declarations on alphabetical order, use whitespaces after a colon, and use very short comments where necessary.
```
/* WORLDMAP */
#container1 {
	height: 300px;
	position: relative;
	width: 100%;
}
```

### HTML
The document starts with `<!DOCTYPE html>`, followed by a `<html>` and `<head>` tag. In this part all libraries, CSS style sheets, scripts and other files are referenced. The `<head>` tag is followed by the `<body>` tag, which contains `<div>` elements for structuring the page. In addition, these '<div>' elements contain the buttons, sliders, etc. Furthermore, the `<body>` contains a header and a footer.
 

## Style Guide sources
- [Google JavaScript Style Guide](https://google.github.io/styleguide/javascriptguide.xml)
- [MDN Coding Style](https://developer.mozilla.org/en-US/docs/JavaScript_Tips)
- [Github minor programmeren](https://project.mprog.nl/reference/github)
- [JavaScript Style Conventions](http://www.w3schools.com/js/js_conventions.asp)

