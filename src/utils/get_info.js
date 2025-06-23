import api from "./instance.js";

export const getQuestionsFront = async () => {
    try {
        // Используем захардкоженные данные для тестирования
        // В реальном приложении раскомментируйте запрос к API
        return [
            {
                test_num: 1, // Исправил с 2 на 1, предполагая что это для фронтенда
                question_num: 1,
                question: "Что такое REST API и каковы его основные принципы?"
            },
            {
                test_num: 1,
                question_num: 2,
                question: "Объясните разницу между SQL и NoSQL базами данных."
            },
            {
                test_num: 1,
                question_num: 3,
                question: "Как работает асинхронное программирование в Node.js?"
            },
            {
                test_num: 1,
                question_num: 4,
                question: "Что такое middleware в Express и как его использовать?"
            },
            {
                test_num: 1,
                question_num: 5,
                question: "Как обеспечить безопасность API (например, аутентификация и авторизация)?"
            },
            {
                test_num: 1,
                question_num: 6,
                question: "Объясните концепцию микросервисов."
            },
            {
                test_num: 1,
                question_num: 7,
                question: "Что такое ORM и какие преимущества оно предоставляет?"
            },
            {
                test_num: 1,
                question_num: 8,
                question: "Как обрабатывать ошибки в серверных приложениях?"
            },
            {
                test_num: 1,
                question_num: 9,
                question: "Что такое WebSocket и когда его стоит использовать?"
            },
            {
                test_num: 1,
                question_num: 10,
                question: "Объясните, как работает кэширование на сервере."
            }
        ];

        // Закомментированный код для реального API запроса
        // const response = await api.get('api/tests/1/questions');
        // return response.data;

    } catch (error) {
        console.error("Error fetching frontend questions:", error);
        throw error;
    }
};

export const getQuestionsBack = async () => {
    try {
        // Закомментированный код для реального API запроса
        // const response = await api.get('api/tests/2/questions');
        // return response.data;

        return [
            {
                test_num: 2,
                question_num: 1,
                question: "Что такое REST API и каковы его основные принципы?"
            },
            {
                test_num: 2,
                question_num: 2,
                question: "Объясните разницу между SQL и NoSQL базами данных."
            },
            {
                test_num: 2,
                question_num: 3,
                question: "Как работает асинхронное программирование в Node.js?"
            },
            {
                test_num: 2,
                question_num: 4,
                question: "Что такое middleware в Express и как его использовать?"
            },
            {
                test_num: 2,
                question_num: 5,
                question: "Как обеспечить безопасность API (например, аутентификация и авторизация)?"
            },
            {
                test_num: 2,
                question_num: 6,
                question: "Объясните концепцию микросервисов."
            },
            {
                test_num: 2,
                question_num: 7,
                question: "Что такое ORM и какие преимущества оно предоставляет?"
            },
            {
                test_num: 2,
                question_num: 8,
                question: "Как обрабатывать ошибки в серверных приложениях?"
            },
            {
                test_num: 2,
                question_num: 9,
                question: "Что такое WebSocket и когда его стоит использовать?"
            },
            {
                test_num: 2,
                question_num: 10,
                question: "Объясните, как работает кэширование на сервере."
            }
        ];
    } catch (error) {
        console.error("Error fetching backend questions:", error);
        throw error;
    }
};

export const postAnswers = async (answers) => {
    try {
        if (!answers || answers.length === 0) {
            throw new Error("Необходимо предоставить ответы для отправки");
        }

        // Получаем test_id из первого ответа
        const test_id = answers[0].test_id;

        // Форматируем ответы в соответствии с требуемой структурой API
        const payload = {
            test_id,
            answers: answers.map(answer => ({
                answer_text: answer.answer,
                time_spent: answer.time_spent || 0, // Возможность передать время, если оно есть
                question_id: answer.question_id
            })),
            total_time: answers.reduce((total, answer) => total + (answer.time_spent || 0), 0)
        };

        console.log("Отправка данных в формате:", payload);
        const response = await api.post(`api/submissions/${test_id}/submit`, payload);
        return response.data;
    } catch (error) {
        console.error("Error posting answers:", error);
        throw error;
    }
};