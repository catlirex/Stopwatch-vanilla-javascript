let minsDisplay = 0;
let secondsDisplay = 0;
let millisecondDisplay = 0;

let lapMinsDisplay = 0;
let lapSecondsDisplay = 0;
let lapMillisecondDisplay = 0;
let lapTimeVar = null
let lapNumber = 0
let lapMillisecond = 0
let lapRecord = []


function mainClockTimeCounter(){
    millisecondDisplay ++

    if(millisecondDisplay === 100){
        millisecondDisplay -= 100;
        secondsDisplay += 1
        if(secondsDisplay === 60){
            secondsDisplay -= 50
            minsDisplay += 1
        }
    }
    
    let timeH1 = document.querySelector(".clock h1")
    timeH1.innerText = `${minsDisplay.toString().padStart(2, "0")} :  ${secondsDisplay.toString().padStart(2, "0")} : ${millisecondDisplay.toString().padStart(2, "0")}`
}

function resetClock(){
    minsDisplay = 0;
    secondsDisplay = 0;
    millisecondDisplay = 0;

    let timeH1 = document.querySelector(".clock h1")
    timeH1.innerText = `${minsDisplay.toString().padStart(2, "0")} :  ${secondsDisplay.toString().padStart(2, "0")} : ${millisecondDisplay.toString().padStart(2, "0")}`


    let lapUl = document.querySelector(".result-list")
    lapUl.innerHTML = ""
    lapNumber = 0 
    lapTimeVar = null
    lapRecord = []
}

function startCounter(){
    let leftBtn = document.querySelector(".left")
    leftBtn.innerText = "Reset"
    leftBtn.addEventListener("click",resetClock)

    let rightBtn = document.querySelector(".right")
    rightBtn.innerText = "Start"

    rightBtn.addEventListener("click", function startClock(){
        let intervalVar = setInterval(mainClockTimeCounter,10)
        let bgAnimation = document.querySelector(".animation")
        bgAnimation.style.animationPlayState = "running"

        if (lapTimeVar !== null){
            lapTimeVar = setInterval(lapTimeCounter,10)
            lapRecord.pop()
            console.log(lapRecord)
        }
        rightBtn.removeEventListener("click", startClock)

        rightBtn.innerText = "Stop"
        rightBtn.addEventListener("click", function stopClock(){
            let bgAnimation = document.querySelector(".animation")
            bgAnimation.style.animationPlayState = "paused"
        

            rightBtn.removeEventListener("click", stopClock)
            clearInterval(intervalVar)
            if (lapTimeVar !== null){
                clearInterval(lapTimeVar)
                lapRecord.push(lapMillisecond)
                colorIndication()
                console.log(lapRecord)
                
            }
            leftBtn.removeEventListener("click", addLap)
            startCounter()
        })

        leftBtn.removeEventListener("click", resetClock)
        leftBtn.innerText = "Lap"
        if ((lapTimeVar === null)) leftBtn.addEventListener("click", firstLap)
        leftBtn.addEventListener("click", addLap)

        
    })
}

function firstLap(){
    lapNumber++
    let lapUl = document.querySelector(".result-list")
    let lapLi = document.createElement("li")
    let lapId = document.createElement("span")
    lapId.innerText = `Lap${lapNumber}`

    let lapTime = document.createElement("span")
    lapTime.innerText = `${minsDisplay.toString().padStart(2, "0")} :  ${secondsDisplay.toString().padStart(2, "0")} : ${millisecondDisplay.toString().padStart(2, "0")}`
    lapLi.append(lapId, lapTime)
    lapUl.append(lapLi)

    let leftBtn = document.querySelector(".left")
    leftBtn.removeEventListener("click", firstLap)

    lapMillisecond = millisecondDisplay + secondsDisplay*1000 + minsDisplay*60*1000
    
}

function addLap(){
    if (lapTimeVar !== null){
        clearInterval(lapTimeVar)
    }
    lapRecord.push(lapMillisecond)
    colorIndication()
    console.log(lapRecord)

    lapNumber++
    let lapUl = document.querySelector(".result-list")
    let lapLi = document.createElement("li")
    let lapId = document.createElement("span")
    lapId.innerText = `Lap${lapNumber}`

    let lapTime = document.createElement("span")
    lapTime.setAttribute("id", `${lapNumber}`)
    lapLi.append(lapId, lapTime)
    lapUl.append(lapLi)

    lapMinsDisplay = 0;
    lapSecondsDisplay = 0;
    lapMillisecondDisplay = 0;
    lapTimeVar = setInterval(lapTimeCounter, 10)
}

function lapTimeCounter(){
    lapMillisecondDisplay ++

    if(lapMillisecondDisplay === 100){
        lapMillisecondDisplay -= 100;
        lapSecondsDisplay += 1
        if(lapSecondsDisplay === 60){
            lapSecondsDisplay -= 50
            lapMinsDisplay += 1
        }
    }
    lapMillisecond = lapMillisecondDisplay + lapSecondsDisplay*1000 + lapMinsDisplay*60*1000
    let lapTime = document.getElementById(`${lapNumber}`)
    lapTime.innerText = `${lapMinsDisplay.toString().padStart(2,"0")} :  ${lapSecondsDisplay.toString().padStart(2,"0")} : ${lapMillisecondDisplay.toString().padStart(2,"0")}`
}

function colorIndication(){
    
    let largestLapTime = Math.max(...lapRecord)
    let largestLapIndex = lapRecord.findIndex(function(lap){
        return lap === largestLapTime
    })

    let smallestLapTime = Math.min(...lapRecord)
    let smallestLapIndex = lapRecord.findIndex(function(lap){
        return lap === smallestLapTime
    })
    
    let lapLi = Array.from(document.querySelector(".result-list").children)
    lapLi.map(initialColor);

    lapLi[largestLapIndex].style.color = "red"
    lapLi[smallestLapIndex].style.color = "green"

}


function initialColor(element){
    element.style.color = "initial"
}


startCounter()

