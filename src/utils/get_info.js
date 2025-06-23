import api from "./instance.js";

export const getQuestionsFront = async () => {
    try {
        // return [
        //     {
        //         test_num: 2,
        //         question_num: 1,
        //         question: "Что такое REST API и каковы его основные принципы?"
        //     },
        //     {
        //         test_num: 2,
        //         question_num: 2,
        //         question: "Объясните разницу между SQL и NoSQL базами данных."
        //     },
        //     {
        //         test_num: 2,
        //         question_num: 3,
        //         question: "Как работает асинхронное программирование в Node.js?"
        //     },
        //     {
        //         test_num: 2,
        //         question_num: 4,
        //         question: "Что такое middleware в Express и как его использовать?"
        //     },
        //     {
        //         test_num: 2,
        //         question_num: 5,
        //         question: "Как обеспечить безопасность API (например, аутентификация и авторизация)?"
        //     },
        //     {
        //         test_num: 2,
        //         question_num: 6,
        //         question: "Объясните концепцию микросервисов."
        //     },
        //     {
        //         test_num: 2,
        //         question_num: 7,
        //         question: "Что такое ORM и какие преимущества оно предоставляет?"
        //     },
        //     {
        //         test_num: 2,
        //         question_num: 8,
        //         question: "Как обрабатывать ошибки в серверных приложениях?"
        //     },
        //     {
        //         test_num: 2,
        //         question_num: 9,
        //         question: "Что такое WebSocket и когда его стоит использовать?"
        //     },
        //     {
        //         test_num: 2,
        //         question_num: 10,
        //         question: "Объясните, как работает кэширование на сервере."
        //     }
        //
        const response = await api.get('api/tests/1/questions');
        return response.data;

    } catch (error) {
        console.error("Error fetching frontend questions:", error);
        throw error;
    }
};

export const getQuestionsBack = async () => {
    try {
        const response = await api.get('api/tests/2/questions');
        return response.data;
        // return [
        //     {
        //         test_num: 2,
        //         question_num: 1,
        //         question: "Что такое REST API и каковы его основные принципы?"
        //     },
        //     {
        //         test_num: 2,
        //         question_num: 2,
        //         question: "Объясните разницу между SQL и NoSQL базами данных."
        //     },
        //     {
        //         test_num: 2,
        //         question_num: 3,
        //         question: "Как работает асинхронное программирование в Node.js?"
        //     },
        //     {
        //         test_num: 2,
        //         question_num: 4,
        //         question: "Что такое middleware в Express и как его использовать?"
        //     },
        //     {
        //         test_num: 2,
        //         question_num: 5,
        //         question: "Как обеспечить безопасность API (например, аутентификация и авторизация)?"
        //     },
        //     {
        //         test_num: 2,
        //         question_num: 6,
        //         question: "Объясните концепцию микросервисов."
        //     },
        //     {
        //         test_num: 2,
        //         question_num: 7,
        //         question: "Что такое ORM и какие преимущества оно предоставляет?"
        //     },
        //     {
        //         test_num: 2,
        //         question_num: 8,
        //         question: "Как обрабатывать ошибки в серверных приложениях?"
        //     },
        //     {
        //         test_num: 2,
        //         question_num: 9,
        //         question: "Что такое WebSocket и когда его стоит использовать?"
        //     },
        //     {
        //         test_num: 2,
        //         question_num: 10,
        //         question: "Объясните, как работает кэширование на сервере."
        //     }
        // ];
    } catch (error) {
        console.error("Error fetching backend questions:", error);
        throw error;
    }
};

export const postAnswers = async (answers) => {
    try {
        // Получаем test_id из первого ответа
        const test_id = answers.length > 0 ? answers[0].test_id : 0;

        // Форматируем ответы в соответствии с требуемой структурой API
        const payload = {
            test_id: test_id,
            answers: answers.map(answer => ({
                answer_text: answer.answer,
                time_spent: 0, // Пока нет измерения времени на вопрос
                question_id: answer.question_id
            })),
            total_time: 0 // Пока нет измерения общего времени
        };

        console.log("Отправка данных в формате:", payload);
        const response = await api.post(`/api/submissions/${test_id}/submit`, payload);
        return response.data;
    } catch (error) {
        console.error("Error posting answers:", error);
        throw error;
    }
};