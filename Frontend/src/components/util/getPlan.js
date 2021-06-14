export const getPlan =(plan)=>{
    if(plan === "hanky")
        return "종이타월 대신 개인 손수건 사용하기"
    if(plan === "tumbler")
        return "종이컵 대신 개인컵 사용하기"
    if(plan === "basket")
        return "비닐봉투 대신 장바구니 사용하기"
    if(plan === "recycle")
        return "재활용이 가능한 유리병, 캔 등 분리배출하기\t"
    if(plan === "water")
        return "물을 받아서 설거지 하기"

    if(plan === "tv")
        return "TV 사용 시간 줄이기"
    if(plan === "washer")
        return "세탁기 사용 시간 줄이기"
    if(plan === "computer")
        return "컴퓨터 사용 시간 줄이기"
    if(plan === "cooker")
        return "전기밥솥 보온 시간 줄이기"
    if(plan === "microwave")
        return "전자레인지 사용 시간 줄이기"
    if(plan === "bicycle")
        return "가까운 거리는 도보나 자전거 이용"
    if(plan === "publicTransport")
        return "승용차 대신 대중교통 이용"
    if(plan === "aircon")
        return "에어컨 사용 시간 줄이기"
    if(plan === "fan")
        return "선풍기 사용 시간 줄이기"
    if(plan === "Boiler")
        return "보일러 사용 시간 줄이기"
    if(plan === "electricBlanket")
        return "전기장판 사용 시간 줄이기"

   else
       return plan

}
