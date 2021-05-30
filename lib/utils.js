import { addDays, differenceInCalendarDays } from 'date-fns'

// Todo: this does not work when date is in the future
export function findSignificantDates(date) {
    const specialDate = new Date(date)
    var candidate = new Date()
    const specialDates = []
    
    for(let i = 0 ; i < 50000 ; i++){
        candidate = addDays(candidate, 1)
        let numOfDays = differenceInCalendarDays(candidate, specialDate)
        if (isNumberSpecial(numOfDays)){
            specialDates.push({ date : candidate, numberOfDaysInBetween : numOfDays })
        }
    }
    return specialDates
}

function isNumberSpecial(num){
    // 1. all the same numbers 8888 ✔
    // 2. repeating numbers 121212 ✔
    // 3. semi repeating numbers 12121, 14141, 1231231,
    // 4. increasing numbers 12345 ✔
    // 5. decreasing numbers 54321 ✔
    // 6. sorounded by same numbers 14441
    // 7. Round numbers 1000, 2000, 
    // 8. Special numbers 420, 313
    // 9. mountain feeling numbers 12321
    // 10. hill feeling numbers 32123 , 21012
    // 11. mirror numbers 101 or 202 or 12021
    // 12. Anniversaries
    // 13. Monthaversaries

    
    let numStr = num.toString()
    return sameDigits(numStr) || repeatingDigits (numStr) || increasingOrDecreasingDigits(numStr)
}

function sameDigits (numStr){
    let first = numStr[0];
    for (let i=0;i<numStr.length;i++){
        if(numStr[i] !== first) return false
    }
    return true
}

function repeatingDigits(numStr){
    for(let i=2;i<=numStr.length/2;i++){
        var m = {}
        for(let j=0;j<numStr.length/i;j++){
            var token = ""
            for(let k=j*i;k<j*i+i;k++){
                token += numStr[k]
            }
            m[token] = true
        }
        if(Object.keys(m).length === 1) return true
    }
    return false
}

function semiRepeatingDigit(numStr){
    return false
}

function increasingOrDecreasingDigits(numStr){
    if (numStr.length <= 2) return false
    for(let i=1;i<9;i++){
        let increasingCounter = 0
        let decreasingCounter = 0

        let n = +numStr[0]
        for(let j=1;j<numStr.length;j++){
            if (n + i === +numStr[j]) { increasingCounter += 1 }
            else if (n - i === +numStr[j]) { decreasingCounter += 1 }
            else { break }
            
            n = +numStr[j]
        }
        if(increasingCounter + 1 === numStr.length) return true
        if(decreasingCounter + 1 === numStr.length) return true
    }
    return false
}