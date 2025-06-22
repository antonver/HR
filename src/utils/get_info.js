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
        const response = await api.get('/questions/frontend');
        return response.data;

    } catch (error) {
        console.error("Error fetching frontend questions:", error);
        throw error;
    }
};

export const getQuestionsBack = async () => {
    try {
        const response = await api.get('/question/backend');
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
        const payload = [...answers, { username }];
        const response = await api.post('/answers', payload);
        return response.data;
    } catch (error) {
        console.error("Error posting answers:", error);
        throw error;
    }
};