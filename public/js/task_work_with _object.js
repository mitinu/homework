for (const sensorIdx in sensors) {
    const sensor = sensors[sensorIdx];
    console.log(`сенсор: ${sensor.sensor_title} с id: ${sensor.sensor_id}`)
    for (const actIdx in sensor.acts) {
        const act = sensor.acts[actIdx];
        console.log(`акт: ${act.act_type_title} с id: ${act.act_id}`)
        const date_start = new Date(act.date_start).toLocaleDateString('ru-RU')
        let date_end = null
        
        if (act.period_action) {
            date_end = new Date(act.date_start)
            date_end = new Date(date_end.setMonth(date_end.getMonth() + parseInt(act.period_action))).toLocaleDateString('ru-RU')
        }
        else {
            date_end = "-"
        }
        console.log(`начало: ${date_start} конец: ${date_end}`)
    }
}
