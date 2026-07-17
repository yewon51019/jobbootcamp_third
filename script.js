//battery setting
let batteryLevel=100;

//alarm setting
const maxAlarmListLength=3;
let alarmListElementCurrentNumber=0;

const setAlarmListElement=document.getElementById("alarmSettingAddBtn");
const setInitAlarmListElement=document.getElementById("initAlarmListElementBtn")

setAlarmListElement.addEventListener("click", setAlarm);
setInitAlarmListElement.addEventListener("click", setInitAlarm);

//도메인 설정
// document.addEventListener("DOMContentLoaded", ()=>{
//     const numberInput=document.querySelectorAll('input[type="number"]')

//     numberInputs.forEach(input=>{
//         input.addEventListener("keydown", (event)=>{
//             if(['.','-','e','E'].includes(event.key)){
//                 event.preventDefault();
//             }
//         })

//         numberInputs.addEventListener("input", function(){
//             this.value=this.value.replace(/[^0-9]/g, '');
//         });
//     })
// });

function getTime(){
    const currentDateTime=new Date(); //현재 날짜와 시간 객체 생성

    //월, 일 가져오기
    const month=String(currentDateTime.getMonth()+1).padStart(2,'0');
    const date=String(currentDateTime.getDate()).padStart(2,'0');
    const currentDate=`${month}월 ${date}일`;

    //시, 분, 초 가져오기
    const hour=String(currentDateTime.getHours()).padStart(2,'0');
    const minutes=String(currentDateTime.getMinutes()).padStart(2,'0');
    const seconds=String(currentDateTime.getSeconds()).padStart(2,'0');
    const currentTime=`${hour}:${minutes}:${seconds}`;
    updateBattery();

    return {currentDate, currentTime}
}

function displayHeadTime(){
    const {currentDate, currentTime}=getTime();

    //화면 반영
    document.getElementById('clock').innerText=`${currentTime}`;
    document.getElementById('date').innerText=`${currentDate}`;

}

function updateBattery(){
    document.getElementById('batteryLevel').innerText=`배터리잔량:${batteryLevel}%`;
    
    if(batteryLevel>0){
        batteryLevel=batteryLevel-1;
    }
}

function setAlarm(){
    if(alarmListElementCurrentNumber>maxAlarmListLength){
        alert("알람은 최대 3개까지만 설정가능합니다. 삭제 후 재시도 해주십시오.")
        return;
    }
    alarmListElementCurrentNumber+=1;

    const hourInput=document.getElementById('alarmSettingHour');
    const minInput=document.getElementById('alarmSettingMinutes');
    const secInput=document.getElementById('alarmSettingSeconds');

    const settedAlarmHour=String(hourInput ? hourInput.value : "0" || "0").padStart(2, '0');
    const settedAlarmMinutes=String(minInput ? minInput.value : "0" || "0").padStart(2, '0');
    const settedAlarmSeconds=String(secInput ? secInput.value : "0" || "0").padStart(2, '0');

    document.getElementById(`alarmSettingElement${alarmListElementCurrentNumber}`).innerHTML=`${settedAlarmHour}:${settedAlarmMinutes}:${settedAlarmSeconds}`;
}

function setInitAlarm(){
    for(let i=1; i<=maxAlarmListLength;i++){
        document.getElementById(`alarmSettingElement${i}`).innerHTML=`00:00:00`;
    }

    alarmListElementCurrentNumber=0;
}

displayHeadTime();
setInterval(displayHeadTime, 1000);