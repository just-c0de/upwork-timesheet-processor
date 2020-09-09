let fs = require('fs')


function getEmployees(content) {
    let result = []

    let lines = content.split('\r\n')
    for (let i = 0; i < lines.length; i++) {
        if (i === 0) continue

        let parts = lines[i].split(',')
        result.push({
            date: parts[0],
            freelancer: parts[1],
            contract: parts[2],
            hours: parts[3]
        })
    }
    return result
}

function getUniqueEmployees(employees) {
    let result = []

    for (let i = 0; i < employees.length; i++) {
        let name = employees[i].freelancer
        let found = false
        for (let j = 0; j < result.length; j++) {
            if (result[j] === name) {
                found = true
                break
            }
        }
        if (found === false) {
            result.push(name)
        }
    }
    return result
}

function getUniqueDates(data) {
    let result = []

    for (let i = 0; i < data.length; i++) {
        let date = data[i].date
        let found = false
        for (let j = 0; j < result.length; j++) {
            if (result[j] === date) {
                found = true
                break
            }
        }
        if (found === false) {
            result.push(date)
        }
    }
    return result
}

function getWorktime(employees) {
    let result = {}

    for(let i = 0; i < employees.length; i++) {
        let employee = employees[i]
        if (result[employee.freelancer] === undefined) {
            result[employee.freelancer] = {}
        }
        result[employee.freelancer][employee.date] = employee.hours
    }
    return result
}

function printWorktime(uniqueEmployees, uniqueDates, employeeTime) {

    for (let i = 0; i < uniqueEmployees.length; i++) {
        let line = uniqueEmployees[i]

        for (let j = 0; j < uniqueDates.length; j++) {
            let hours = employeeTime[uniqueEmployees[i]][uniqueDates[j]]
            if (hours === undefined) hours = 0
            line = line + ' ' + hours
        }
        console.log(line)
    }

}

let content = fs.readFileSync("employees.csv", 'utf8')

getWorktime(getEmployees(content))

printWorktime(getUniqueEmployees(getEmployees(content)), getUniqueDates(getEmployees(content)), getWorktime(getEmployees(content)))



/*
let employess = getUniqueEmployees(getEmployees(content))
employess.sort()
console.log(employess)
let dates = getUniqueDates(getEmployees(content))
dates.sort()
console.log(dates)

 */