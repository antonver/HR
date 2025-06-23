import { useDispatch, useSelector } from 'react-redux';
import { addAnswer, clearAnswers } from '../store/slices/answersSlice';
import { Button, TextField, Box, Typography, CircularProgress } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import { getQuestionsBack, getQuestionsFront } from '../utils/get_info.js';
import { useNavigate } from "react-router-dom";
import { increment } from "../store/slices/counterSlice.js";

const QuestionPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const answers = useSelector((state) => state.answers);
    const typeTest = useSelector((state) => state.test.typeTest);
    const count = useSelector((state) => state.counter);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null);
    const [timeSpent, setTimeSpent] = useState(0);
    const [totalTimeSpent, setTotalTimeSpent] = useState(0);

    useEffect(() => {
        const fetchQuestions = async () => {
            if (!typeTest || !['frontend', 'backend'].includes(typeTest)) {
                setErrorMsg('Invalid test type.');
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                const data = typeTest === 'frontend' ? await getQuestionsFront() : await getQuestionsBack();
                setQuestions(Array.isArray(data) ? data : []);
            } catch (error) {
                setErrorMsg('Failed to load questions.');
                console.error('Error loading questions:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchQuestions();
    }, [typeTest]);

    const saveAnswersToJson = (payload) => {
        // Создаем объект Blob с JSON данными
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });

        // Создаем URL для скачивания
        const url = URL.createObjectURL(blob);

        // Создаем временную ссылку для скачивания файла
        const a = document.createElement('a');
        a.href = url;
        a.download = `answers_${typeTest}_${new Date().toISOString().split('T')[0]}.json`;

        // Программно кликаем по ссылке для запуска скачивания
        document.body.appendChild(a);
        a.click();

        // Удаляем временную ссылку
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        return true;
    };

    const handleNext = useCallback(async () => {
        if (!questions.length) return;

        const currentQuestion = questions[currentQuestionIndex];
        const currentAnswer = answers.find(
            (ans) => ans.question_id === currentQuestion.id && ans.test_id === currentQuestion.test_id
        )?.answer || '';

        setTotalTimeSpent((prev) => prev + timeSpent);
        dispatch(
            addAnswer({
                test_id: currentQuestion.test_id,
                question_id: currentQuestion.id,
                answer: currentAnswer,
                time_spent: timeSpent,
            })
        );

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setTimeSpent(0);
        } else {
            const updatedAnswers = [...answers];

            const isCurrentAnswerAlreadyAdded = answers.some(
                (ans) =>
                    ans.question_id === currentQuestion.id &&
                    ans.test_id === currentQuestion.test_id
            );

            if (!isCurrentAnswerAlreadyAdded) {
                updatedAnswers.push({
                    test_id: currentQuestion.test_id,
                    question_id: currentQuestion.id,
                    answer: currentAnswer,
                    time_spent: timeSpent,
                });
            }

            const payload = {
                test_id: currentQuestion.test_id,
                answers: updatedAnswers.map((ans) => ({
                    answer_text: ans.answer,
                    time_spent: ans.time_spent,
                    question_id: ans.question_id,
                })),
                total_time: updatedAnswers.reduce((sum, ans) => sum + ans.time_spent, 0),
            };

            console.log('Сохраняем ответы в JSON:', JSON.stringify(payload, null, 2));

            try {
                // Сохраняем ответы в JSON-файл вместо отправки на сервер
                const success = saveAnswersToJson(payload);

                if (success) {
                    alert('Ответы успешно сохранены в JSON!');
                    dispatch(clearAnswers());
                    setCurrentQuestionIndex(0);
                    dispatch(increment());
                    setQuestions([]);
                    if (count === 1) {
                        navigate('/backend');
                    } else {
                        navigate('/end');
                    }
                }
            } catch (error) {
                console.error('Не удалось сохранить ответы:', error);
                alert('Не удалось сохранить ответы.');
            }
        }
    }, [currentQuestionIndex, questions, answers, dispatch, timeSpent, typeTest, count, navigate]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeSpent((prev) => {
                if (prev >= 90) {
                    handleNext();
                    return 0;
                }
                return prev + 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [currentQuestionIndex, handleNext]);

    const handleAnswerChange = (e) => {
        if (!questions.length) return;

        const currentQuestion = questions[currentQuestionIndex];

        dispatch(
            addAnswer({
                test_id: currentQuestion.test_id,
                question_id: currentQuestion.id,
                answer: e.target.value,
                time_spent: timeSpent,
            })
        );
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                <CircularProgress color="primary" />
                <Typography sx={{ ml: 2 }}>Загрузка вопросов...</Typography>
            </Box>
        );
    }

    if (errorMsg) {
        return <Typography color="error">{errorMsg}</Typography>;
    }

    if (!questions || questions.length === 0) {
        return <Typography color="error">Вопросы недоступны.</Typography>;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const currentAnswer = answers.find(
        (ans) => ans.question_id === currentQuestion.id && ans.test_id === currentQuestion.test_id
    )?.answer || '';

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 3,
                minHeight: '100vh',
                bgcolor: '#1a1a1a',
                color: '#fff',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 1,
                    mb: 3,
                }}
            >
                {questions.map((_, index) => (
                    <Box
                        key={index}
                        sx={{
                            width: 40,
                            height: 40,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: index <= currentQuestionIndex ? '#facc15' : 'transparent',
                            border: '1px solid #facc15',
                            color: index <= currentQuestionIndex ? '#1a1a1a' : '#facc15',
                        }}
                    >
                        {index + 1}
                    </Box>
                ))}
            </Box>

            <Typography variant="h6" sx={{ mb: 3, maxWidth: '600px', textAlign: 'center' }}>
                {currentQuestion.question_text}
            </Typography>

            <TextField
                variant="outlined"
                placeholder="Введите ваш ответ..."
                value={currentAnswer}
                onChange={handleAnswerChange}
                multiline
                rows={6}
                fullWidth
                sx={{
                    mb: 3,
                    width: '100%',
                    maxWidth: '600px',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#4b5563' },
                        '&:hover fieldset': { borderColor: '#6b7280' },
                        '&.Mui-focused fieldset': { borderColor: '#facc15' },
                        backgroundColor: '#2d2d2d',
                        color: '#fff',
                    },
                    '& .MuiInputBase-input': { color: '#fff' },
                }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', maxWidth: '600px', mt: 2 }}>
                <Button
                    variant="contained"
                    sx={{
                        bgcolor: '#facc15',
                        color: '#1a1a1a',
                        width: '100%',
                        '&:hover': { bgcolor: '#e0ab0e' },
                    }}
                    onClick={handleNext}
                    disabled={currentAnswer.trim() === ''}
                >
                    {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Continuuer'}
                </Button>
            </Box>

            <Typography sx={{ mt: 2 }}>Оставшееся время: {90 - timeSpent} секунд</Typography>
            <Typography sx={{ mt: 1 }}>Общее время: {totalTimeSpent + timeSpent} секунд</Typography>
        </Box>
    );
};

export default QuestionPage;