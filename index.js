        // This function creates an employee record object from an array of employee information
function createEmployeeRecord(array) {
    return {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: [],
    };
  }
  
  // This function creates an array of employee record objects from an array of arrays of employee information
  function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(createEmployeeRecord);
  }
  
  // This function adds a time-in event for an employee on a specific date
  function createTimeInEvent(dateStamp) {
    const [date, hour] = dateStamp.split(" "); // Destructuring assignment to extract date and hour from dateStamp string
    const timeInEvent = {
      type: "TimeIn",
      hour: parseInt(hour),
      date: date,
    };
    this.timeInEvents.push(timeInEvent); // Add the time-in event to the employee's timeInEvents array
    return this; // Return the employee record object for method chaining
  }
  
  // This function adds a time-out event for an employee on a specific date
  function createTimeOutEvent(dateStamp) {
    const [date, hour] = dateStamp.split(" "); // Destructuring assignment to extract date and hour from dateStamp string
    const timeOutEvent = {
      type: "TimeOut",
      hour: parseInt(hour),
      date: date,
    };
    this.timeOutEvents.push(timeOutEvent); // Add the time-out event to the employee's timeOutEvents array
    return this; // Return the employee record object for method chaining
  }
  
  // This function calculates the hours worked by an employee on a specific date
  function hoursWorkedOnDate(date) {
    const timeIn = this.timeInEvents.find((event) => event.date === date); // Find the time-in event for the specified date
    const timeOut = this.timeOutEvents.find((event) => event.date === date); // Find the time-out event for the specified date
    return (timeOut.hour - timeIn.hour) / 100; // Calculate the hours worked
  }
  
  // This function calculates the wages earned by an employee on a specific date
  function wagesEarnedOnDate(date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date); // get the hours worked on a specific date for the current employee by calling the hoursWorkedOnDate function and passing the current employee and the date as arguments
    const payRate = this.payPerHour; // get the pay rate for the current employee
    const wagesEarned = hoursWorked * payRate; // calculate the wages earned by multiplying the hours worked with the pay rate
    return wagesEarned; // return the calculated wages earned
  }
  
  function findEmployeeByFirstName(collection, firstNameString) {
    return collection.find((employee) => employee.firstName === firstNameString); // find the employee record in the collection whose first name matches the firstNameString argument and return it
  }
  
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((totalPay, employeeRecord) => { // use the reduce method to iterate over each employee record in the employeeRecords array and accumulate their wages earned
      return totalPay + allWagesFor.call(employeeRecord); // call the allWagesFor function with the current employee record as the context to get their total wages earned and add it to the running total
    }, 0); // start the running total at 0
  }
  
  
  
     

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

