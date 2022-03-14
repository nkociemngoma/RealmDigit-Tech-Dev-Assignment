//// HEADING //////
const today = new Date();
const options = {
  weekday: "long",
  day: "numeric",
  month: "long",
};

document.getElementById("heading").innerHTML = today.toLocaleDateString(
  "en-US",
  options
);

//// DATA /////

// for making birth date to current date to show content
// you can change birth dates to current dates to see employee in results
var d = new Date();
var currentMonthAndDate =
  (d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1) +
  "/" +
  d.getDate();


  const url = 'https://interview-assessment-1.realmdigital.co.za/employees';

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let employees = data;
     
/// TODAY BIRTHDAY DATA FILTER////

var todayData = [];

const currentDate = new Date().getDate();

const currentMonth = new Date().getMonth();

todayData = employees.filter((employee, index) => {
  const { dateOfBirth, employmentEndDate } = employee;
  if(index < 130 && employmentEndDate == null)
  return (
    parseInt(dateOfBirth.substring(8, 10)) === currentDate &&
    parseInt(dateOfBirth.substring(5, 7)) === currentMonth + 1 
  );
  else return;
});

/// DISPLAY ////

var noOfBirthdays = document.getElementById("noOfBirthdays");
noOfBirthdays.innerHTML = todayData.length + " birthdays today";

var people = document.getElementById("people");

todayData.forEach((employee) => {
  const { id, name, lastname, dateOfBirth } = employee;

  var article = document.createElement("article");
  article.setAttribute("class", "employee");



  var info = document.createElement("div");

  var h4 = document.createElement("h4");
  h4.setAttribute("id", "name");
  h4.innerHTML = name  +" "+lastname;

  var p = document.createElement("p");
  var dob = new Date(dateOfBirth);
  //calculate month difference from current date in time
  var month_diff = Date.now() - dob.getTime();

  //convert the calculated difference in date format
  var age_dt = new Date(month_diff);

  //extract year from date
  var year = age_dt.getUTCFullYear();

  //now calculate the age of the user
  var age = Math.abs(year - 2022);
  p.innerHTML = age + " years";

  info.appendChild(h4);
  info.appendChild(p);

 // article.appendChild(img);
  article.appendChild(info);
  sendEmail(name, lastname)
 
  people.appendChild(article);
  
  
});

});

function sendEmail(name, lastname) {
	Email.send({
		Host: 'smtp.gmail.com',
		Username: 'sender_email',
		Password: 'sender_password',
		To: 'receiver_email',
		From: 'sender_email',
		Subject: 'Happy Birthday!!',
		Body: 'Happy Birthday ' + name+ " "+ lastname + " " 
	})
		.then(function (message) {
            console.log(message)
		alert("mail sent successfully")
		});
	}

//// clear ////

function clearAll() {
  people.innerHTML = "";
  noOfBirthdays.innerHTML = "0 birthdays today";
}
