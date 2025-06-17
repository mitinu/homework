for (const sensorIdx in sensors) {
    const sensor = sensors[sensorIdx];
    console.log(`сенсор: ${sensor.sensor_title} с id: ${sensor.sensor_id}`)
    for (const actIdx in sensor.acts) {
        const act = sensor.acts[actIdx];
        console.log(`акт: ${act.act_type_title} с id: ${act.act_id}`)
        const date_start = toLocaleDateString(new Date(act.date_start))
        // получаем дату окончание акта 
        let date_end = null
        if (act.period_action) {
            date_end = new Date(act.date_start)
            date_end = toLocaleDateString(new Date(date_end.setMonth(date_end.getMonth() + parseInt(act.period_action))))
        } else {
            date_end = "-"
        }
        console.log(`начало: ${date_start} конец: ${date_end}`)
    }
}

console.log(toLocaleDateString(""))
console.log(toLocaleDateString(null))

// функция, которая конвертирует дату в формат гггг-мм-дд
function toLocaleDateString(date) {
    if (!date){
        return date
    }
    const dateStr = date.getFullYear()
        + "-"
        + (date.getMonth() + 1 < 10 ?
            "0" + (date.getMonth() + 1) :
            date.getMonth() + 1)
        + "-"
        + (date.getDay() < 10 ?
            "0" + date.getDay() :
            date.getDay());
    return dateStr
}