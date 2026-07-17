//battery setting
let batteryLevel=100;

//alarm setting
const maxAlarmListLength=3;
let alarmListElementCurrentNumber=0;

const setAlarmListElement=document.getElementById("alarmSettingAddBtn");
const setInitAlarmListElement=document.getElementById("initAlarmListElementBtn")

setAlarmListElement.addEventListener("click", setAlarm);
setInitAlarmListElement.addEventListener("click", setInitAlarm);

//haert img pressed
const heartButton=document.getElementById("heartBtn");
heartButton.addEventListener("click", heartButtonPressed);

const batteryZero=document.getElementById("battaryZero");
batteryZero.addEventListener("click", makeBatteryZero);

// 입력 제어
document.addEventListener("DOMContentLoaded", () => {
    const numberInputs = [
        document.getElementById('alarmSettingHour'),
        document.getElementById('alarmSettingMinutes'),
        document.getElementById('alarmSettingSeconds')
    ];

    numberInputs.forEach(input => {
        if (!input) return;

        input.addEventListener("keydown", (event) => {
            if (['.', '-', 'e', 'E'].includes(event.key)) {
                event.preventDefault();
            }
        });

        input.addEventListener("input", function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    });
});

function getTime(){
    const currentDateTime=new Date(); 

    const month=String(currentDateTime.getMonth()+1).padStart(2,'0');
    const date=String(currentDateTime.getDate()).padStart(2,'0');
    const currentDate=`${month}월 ${date}일`;

    const hour=String(currentDateTime.getHours()).padStart(2,'0');
    const minutes=String(currentDateTime.getMinutes()).padStart(2,'0');
    const seconds=String(currentDateTime.getSeconds()).padStart(2,'0');
    const currentTime=`${hour}:${minutes}:${seconds}`;
    
    if(batteryLevel>0){
        updateBattery(-1);
    }

    return {currentDate, currentTime}
}

function displayHeadTime(){
    const {currentDate, currentTime}=getTime();
    const clocks=document.querySelectorAll('.Clock');

    document.getElementById('date').innerHTML=`${currentDate}`;
    
    clocks.forEach(element=>{
        element.innerText=currentTime;
    });
}

function updateBattery(num){
    if(batteryLevel+num>=100){
        batteryLevel=100;
    }else{
        batteryLevel+=num;
    }

    const phoneClockDisplay = document.getElementById("phoneClock");
    if(batteryLevel===0){
        blackOutPhoneDisplay();
    } else if (phoneClockDisplay) {
        // 배터리가 들어오면 다시 흰색 화면으로 복구
        phoneClockDisplay.style.backgroundColor = '#ffffff';
        phoneClockDisplay.style.color = '#000000';
    }

    document.getElementById('batteryLevel').innerText=`배터리잔량:${batteryLevel}%`;
}

function setAlarm(){
    if(alarmListElementCurrentNumber>=maxAlarmListLength){
        alert("알람은 최대 3개까지만 설정가능합니다. 삭제 후 재시도 해주십시오.")
        return;
    }
    alarmListElementCurrentNumber+=1;

    const hourInput=document.getElementById('alarmSettingHour');
    const minInput=document.getElementById('alarmSettingMinutes');
    const secInput=document.getElementById('alarmSettingSeconds');

    if(Number(minInput.value)>60 || Number(secInput.value)>59){
        alert("0~59 중 입력해 주세요.");
        return;
    }

    const settedAlarmHour=String(hourInput && hourInput.value ? hourInput.value : "0").padStart(2, '0');
    const settedAlarmMinutes=String(minInput && minInput.value ? minInput.value : "0").padStart(2, '0');
    const settedAlarmSeconds=String(secInput && secInput.value ? secInput.value : "0").padStart(2, '0');

    document.getElementById(`alarmSettingElement${alarmListElementCurrentNumber}`).innerHTML=`${settedAlarmHour}:${settedAlarmMinutes}:${settedAlarmSeconds}`;
}

function setInitAlarm(){
    for(let i=1; i<=maxAlarmListLength;i++){
        document.getElementById(`alarmSettingElement${i}`).innerHTML=`00:00:00`;
    }
    alarmListElementCurrentNumber=0;
}

function heartButtonPressed(){
    updateBattery(20);
    document.getElementById('heartBtnText').innerHTML='사랑의 배터리 충전!';

    setTimeout(()=>{
        document.getElementById('heartBtnText').innerHTML='';
    }, 3000);
}

function blackOutPhoneDisplay(){
    const phoneClockDisplay=document.getElementById("phoneClock");
    if(phoneClockDisplay) {
        phoneClockDisplay.style.backgroundColor='#000000';
        phoneClockDisplay.style.color='transparent';
    }
}

function makeBatteryZero(){
    batteryLevel=0;
    updateBattery(0);
}

displayHeadTime();
setInterval(displayHeadTime, 1000);