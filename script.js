let batteryLevel=101;

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

    //화면 반영
    document.getElementById('clock').innerText=`${currentTime}`;
    document.getElementById('date').innerText=`${currentDate}`;


    updateBattery();
}

getTime();
setInterval(getTime, 1000);

function updateBattery(){
    if (batteryLevel>0) {
        batteryLevel=batteryLevel-1;
    }

    document.getElementById('batteryLevel').innerText=`배터리잔량:${batteryLevel}%`;
}