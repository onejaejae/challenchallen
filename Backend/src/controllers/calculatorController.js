
// getReducedCarbon 은 절약 시간/대상으로 탄소 저감량을 계산하여 반환하는 컨트롤러다.
export const getReducedCarbon = async (req, res, next) => {
    try {
        const {
            query : {category, plan}
        } = req;

        if (category == "" || plan == "") {
            return res.status(400).send({
                 err: "category or plan is null" 
                });
        }
        let carbon = await getCarbonAmount(category, plan);
        if (category == "electricity" || category == "airCondition") {
            const {
                query: {sparedTime}
            } = req;
            if (!sparedTime) {
                return res.status(400).send({
                    err: "sparedTime is null" 
                });
            }
            carbon *= sparedTime;
        }
        
        return res.status(200).json({ 
            success: true, 
            reducedCarcon : carbon 
        });
    } catch(error) {
        next(error);
    }
}

// getCarbonAmount 는 실천 방안 별 탄소 저감량을 반환하는 함수다.
export const getCarbonAmount = async (category, plan) => {
    // 실천 방안 별 탄소 저감량(g)
    // electricity, airCondition 은 1분당 저감량
    // traffic, resource는 건당 저감량
    const carbonObj = {
        "resource": {
            "hanky": 29,
            "tumbler": 10,
            "basket": 7,
            "recycle": 241,
            "water": 13   
        }, 
        "traffic": {
            "bicycle": 482,
            "publicTransport": 9546,
        },
        "electricity": {
            "tv": 1,
            "washer": 2,
            "computer": 2,
            "cooker": 1,
            "microwave": 7
        },
        "airCondition": {
            "aircon": 12,
            "fan": 0.4,
            "boiler": 55,
            "electricBlanket": 1
        }
    }
    return carbonObj[category][plan];
}