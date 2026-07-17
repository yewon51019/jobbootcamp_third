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
//도메인 설정(무시처리 됨)
// 입력 폼 제어: 양의 정수만 입력 가능하도록 설정
document.addEventListener("DOMContentLoaded", () => {
    // 시, 분, 초 입력창을 모두 가져옵니다.
    const numberInputs = [
        document.getElementById('alarmSettingHour'),
        document.getElementById('alarmSettingMinutes'),
        document.getElementById('alarmSettingSeconds')
    ];

    numberInputs.forEach(input => {
        if (!input) return; // 혹시 요소가 없으면 건너뜀

        // 1. 키보드로 입력할 때 음수(-), 소수점(.), 지수(e) 입력을 원천 차단
        input.addEventListener("keydown", (event) => {
            if (['.', '-', 'e', 'E'].includes(event.key)) {
                event.preventDefault();
            }
        });

        // 2. 마우스 우클릭으로 붙여넣기 등을 했을 때, 숫자가 아닌 문자는 강제로 지움
        input.addEventListener("input", function() {
            // 0-9가 아닌 모든 문자를 제거 (소수점, 음수 기호 등 삭제)
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    });
});

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
    updateBattery(-1);

    return {currentDate, currentTime}
}

function displayHeadTime(){
    const {currentDate, currentTime}=getTime();

    //화면 반영
    document.getElementById('clock').innerText=`${currentTime}`;
    document.getElementById('date').innerText=`${currentDate}`;

}

function updateBattery(num){
    document.getElementById('batteryLevel').innerText=`배터리잔량:${batteryLevel}%`;
    
    if(batteryLevel==0){
        batteryLevel=batteryLevel;
    } else if(batteryLevel+num>=100){
        batteryLevel=100;
    } else{
        batteryLevel+=num;
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

    if(Number(minInput.value)>60 || Number(secInput.value)>59){
        alert("0~59 중 입력해 주세요.");
        return;
    }

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

function heartButtonPressed(){
    updateBattery(20);
    document.getElementById('heartBtnText').innerHTML='사랑의 배터리 충전!';

    setTimeout(()=>{
        document.getElementById('heartBtnText').innerHTML='';
    }, 3000);
}

displayHeadTime();
setInterval(displayHeadTime, 1000);