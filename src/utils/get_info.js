import api from "./instance.js";

export const getQuestionsFront = async () => {
    try {
        // Uncomment when API is ready
        // const response = await api.get('/questions/frontend');
        // return response.data;
        return [
            {
                test_num: 1,
                question_num: 1,
                question: "Что такое виртуальный DOM и зачем он используется в React?"
            },
            {
                test_num: 1,
                question_num: 2,
                question: "Объясните разницу между компонентами-классами и функциональными компонентами."
            },
            {
                test_num: 1,
                question_num: 3,
                question: "Как работает useState и когда его стоит использовать?"
            },
            {
                test_num: 1,
                question_num: 4,
                question: "Что такое props и как они передаются между компонентами?"
            },
            {
                test_num: 1,
                question_num: 5,
                question: "Для чего используется useEffect и каковы его основные сценарии применения?"
            },
            {
                test_num: 1,
                question_num: 6,
                question: "Что такое lifting state up и зачем это нужно?"
            },
            {
                test_num: 1,
                question_num: 7,
                question: "Как реализовать условный рендеринг в React?"
            },
            {
                test_num: 1,
                question_num: 8,
                question: "Что такое ключи (key) в списках и почему они важны?"
            },
            {
                test_num: 1,
                question_num: 9,
                question: "Объясните принципы работы Context API."
            },
            {
                test_num: 1,
                question_num: 10,
                question: "Как реализовать обработку ошибок в React-компонентах?"
            }
        ];
    } catch (error) {
        console.error("Error fetching frontend questions:", error);
        throw error;
    }
};

export const getQuestionsBack = async () => {
    try {
        // Uncomment when API is ready
        // const response = await api.get('/question/backend');
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

export const postAnswers = async (answers, username) => {
    try {
        const payload = [...answers, { username }];
        const response = await api.post('/answers', payload);
        return response.data;
    } catch (error) {
        console.error("Error posting answers:", error);
        throw error;
    }
};