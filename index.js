// Your code here
function createEmployeeRecord([firstName, familyName, title, payRatePerHour]) {
    return ({
        "firstName": firstName,
        "familyName": familyName,
        "title": title,
        "payPerHour": payRatePerHour,
        "timeInEvents": [],
        "timeOutEvents": []
    })
}

function createEmployeeRecords(mainArray) {
    let newArr = [];
    mainArray.forEach(element => {
        newArr.push(createEmployeeRecord(element));
    });
    return (newArr);
}

function createTimeInEvent(empObj, dateStmp) {
    let arr = dateStmp.split(" ");
    empObj.timeInEvents.push({
        "type": "TimeIn",
        "hour": parseInt(arr[1]),
        "date": `${arr[0]}`
    })
    return empObj;
}


function createTimeOutEvent(empObj, dateStmp) {
    let arr = dateStmp.split(" ");
    empObj.timeOutEvents.push({
        "type": "TimeOut",
        "hour": parseInt(arr[1]),
        "date": `${arr[0]}`
    })
    return empObj;
}
function hoursWorkedOnDate(empObj, dateStmp) {
    let timeIn;
    let timeOut;

    empObj.timeOutEvents.forEach((el) => {
        if (el.date === dateStmp && el.type === "TimeOut") {
            timeOut = parseInt(el.hour);
        }
    })

    empObj.timeInEvents.forEach((el) => {
        if (el.date === dateStmp && el.type === "TimeIn") {
            timeIn = parseInt(el.hour);
        }
    })
    let hrs = parseInt(timeOut - timeIn)
    return (parseInt(hrs / 100));
}

function wagesEarnedOnDate(empObj, dateStmp) {
    return empObj.payPerHour * hoursWorkedOnDate(empObj, dateStmp)
}



function allWagesFor(empObj) {
    let total = 0;
    empObj.timeInEvents.forEach((i) => {
        total +=(wagesEarnedOnDate(empObj, i.date))
    })
    return total;
}

function calculatePayroll(array){
    let total = 0;
    array.forEach((emp)=>{
        total +=(allWagesFor(emp))
    });
    return total;
}