const sensors = {
    19: {
        sensor_id: 19,                                                                                                  //id устройства
        sensor_title: "СМС-8 2:6921",                                                                                   //Название устройства
        date_of_manufacture: "2024-05-09",                                                                              //Дата производства устройства
        storage_period: 240,                                                                                            // Месяцы хранения
        acts: [
            {
                act_id: 0,                                                                                              //id акта
                date_created: "2024-07-11",                                                                             //Дата создания акта
                act_type_id: 8,                                                                                         //Тип акта
                act_type_title: "Акт проведения ТО",                                                                    //Название типа акта
                date_planned: "2024-07-06",                                                                             //Дата планирования проведения ТО
                date_start: null,                                                                               //Дата фактического проведения ТО
                // date_end: "2024-09-06",                                                                                 //Дата окончания ТО
                period_action: null,                                                                                       //Период выполнения
                status_id: 199,                                                                                         //id статуса
                status_title: "Годен",                                                                                  //Название статуса
                status_priority: 5,                                                                                     //Приоритет статуса
            },
            {
                act_id: 1,                                                                                              //id акта
                date_created: "2024-09-14",                                                                             //Дата создания акта
                act_type_id: 8,                                                                                         //Тип акта
                act_type_title: "Акт проведения ТО",                                                                    //Название типа акта
                date_planned: "2024-07-06",                                                                             //Дата планирования проведения ТО
                date_start: "2024-09-14",                                                                               // дата фактического проведения ТО
                // date_end: "2024-11-14",                                                                                 // дата окончания ТО
                period_action: 2,                                                                                       //Период выполнения
                status_id: 200,                                                                                         //id статуса
                status_title: "Годен",                                                                                  //Название статуса
                status_priority: 5,                                                                                     //Приоритет статуса
            },
            {
                act_id: 2,                                                                                              //id акта
                date_created: "2024-11-04",                                                                             //Дата создания акта
                act_type_id: 1,                                                                                         //Тип акта
                act_type_title: "Акт ввода в эксплуатацию",                                                             //Название типа акта
                date_planned: "2024-07-06",                                                                             //Дата планирования проведения ТО
                date_start: "2024-06-06",                                                                               //Дата фактического ввода в эксп
                // date_end: "2029-06-06",                                                                                 //Дата окончания эксплуатации
                period_action: 60,                                                                                      //Период выполнения
                status_id: 201,                                                                                         //id статуса
                status_title: "Годен",                                                                                  //Название статуса
                status_priority: 5,                                                                                     //Приоритет статуса
            },
            {
                act_id: 3,                                                                                              //id акта
                date_created: "2024-11-14",                                                                             //Дата создания акта
                act_type_id: 8,                                                                                         //Тип акта
                act_type_title: "Акт проведения ТО",                                                                    //Название типа акта
                date_planned: "2024-07-06",                                                                             //Дата планирования проведения ТО
                date_start: "2024-11-14",                                                                               //Дата фактического проведения ТО
                // date_end: "2024-01-14",                                                                                 //Дата окончания ТО
                period_action: 2,                                                                                       //Период выполнения
                status_id: 202,                                                                                         //id статуса
                status_title: "Годен",                                                                                  //Название статуса
                status_priority: 5,                                                                                     //Приоритет статуса
            },
            {
                act_id: 4,                                                                                              //id акта
                date_created: "2024-11-14",                                                                             //Дата создания акта
                act_type_id: 8,                                                                                         //Тип акта
                act_type_title: "Акт проведения ТО",                                                                    //Название типа акта
                date_planned: "2024-07-06",                                                                             //Дата планирования проведения ТО
                date_start: "2024-11-14",                                                                               //Дата фактического проведения ТО
                // date_end: "2025-01-14",                                                                                 //Дата окончания ТО
                period_action: 2,                                                                                       //Период выполнения
                status_id: 203,                                                                                         //id статуса
                status_title: "Годен",                                                                                  //Название статуса
                status_priority: 5,                                                                                     //Приоритет статуса
            },
            {
                act_id: 5,
                date_created: "2025-06-16",
                act_type_id: 17,
                act_type_title: "Метрология",
                date_planned: "2024-07-06",
                date_start: "2025-06-05",                                                                               // дата фактического проведения метрологии
                // date_end: "2026-06-05",                                                                                 // дата окончания метрологии
                period_action: 12,
                status_id: 204,                                                                                         //id статуса
                status_title: "Годен",
                status_priority: 5,
            },
            {
                act_id: 6,
                date_created: "2025-06-16",                                                                             // дата создания акта
                act_type_id: 2,                                                                                         // backend/controllers/const_amicum/ActEnum.php - id актов
                act_type_title: "Акт вывода из эксплуатации",
                date_planned: "2024-07-06",
                date_start: "2025-06-06",                                                                               // дата фактического вывода из эксп
                // date_end: null,                                                                                         // дата окончания эксплуатации
                period_action: null,
                status_id: 205,                                                                                         //id статуса
                status_title: "Годен",
                status_priority: 5,
            },
        ]
    },

}