import { useDispatch, useSelector } from 'react-redux';
import { addAnswer } from '../store/slices/answersSlice';
import { Button, TextField, Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { getQuestionsBack, getQuestionsFront, postAnswers } from '../utils/get_info.js';

const QuestionPage = () => {
    const dispatch = useDispatch();
    const answers = useSelector((state) => state.answers);
    const typeTest = useSelector((state) => state.test.typeTest);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchQuestions = async () => {
            if (!typeTest || !['frontend', 'backend'].includes(typeTest)) {
                setError('Invalid test type selected.');
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                let data;
                if (typeTest === 'frontend') {
                    data = await getQuestionsFront();
                } else {
                    data = await getQuestionsBack();
                }
                console.log('Получены вопросы:', data);
                setQuestions(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Ошибка при получении вопросов:', error);
                setError('Failed to fetch questions. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchQuestions();
    }, [typeTest]);

    if (loading) {
        return <Typography color="primary">Loading questions...</Typography>;
    }
    if (error) {
        return <Typography color="error">{error}</Typography>;
    }
    if (!questions || questions.length === 0) {
        return <Typography color="error">No questions available.</Typography>;
    }

    const currentQuestion = questions[currentQuestionIndex];

    if (!currentQuestion || currentQuestionIndex >= questions.length) {
        return <Typography color="error">No more questions available.</Typography>;
    }

    const currentAnswer = answers.find(
        (ans) => ans.test_num === currentQuestion.test_num && ans.question_num === currentQuestion.question_num
    )?.answer || '';

    const handleNext = async () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            const allAnswers = answers.map((ans) => ({
                test_num: ans.test_num,
                question_num: ans.question_num,
                answer: ans.answer,
            }));
            try {
                console.log('Отправляем ответы:', allAnswers);
                await postAnswers(allAnswers);
                alert('Ответы успешно отправлены!');
                setCurrentQuestionIndex(0);
                setQuestions([]);
                dispatch(clearType()); // Clear test type after submission
            } catch (error) {
                console.error('Ошибка при отправке ответов:', error);
                alert('Не удалось отправить ответы. Пожалуйста, попробуйте снова.');
            }
        }
    };

    const handleBack = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleAnswerChange = (e) => {
        const value = e.target.value;
        console.log('Введенный ответ:', value);
        dispatch(
            addAnswer({
                test_num: currentQuestion.test_num,
                question_num: currentQuestion.question_num,
                answer: value,
            })
        );
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                bgcolor: '#1a1a1a',
                color: '#fff',
            }}
        >
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                {[...Array(questions.length)].map((_, i) => (
                    <Box
                        key={i}
                        sx={{
                            width: 32,
                            height: 32,
                            border: '2px solid #facc15',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: i === currentQuestionIndex ? '#facc15' : 'transparent',
                        }}
                    >
                        {i + 1}
                    </Box>
                ))}
            </Box>
            <Button
                onClick={handleBack}
                sx={{ color: '#facc15', mb: 2, alignSelf: 'flex-start' }}
                aria-label="Go back"
                disabled={currentQuestionIndex === 0}
            >
                ← Back
            </Button>
            <Typography variant="h6" sx={{ mb: 2 }}>
                {currentQuestion.question}
            </Typography>
            <TextField
                variant="outlined"
                placeholder="Введите ваш ответ"
                value={currentAnswer}
                onChange={handleAnswerChange}
                multiline
                rows={4}
                fullWidth
                sx={{
                    mb: 2,
                    width: 400,
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#4b5563' },
                        '&:hover fieldset': { borderColor: '#6b7280' },
                        '&.Mui-focused fieldset': { borderColor: '#facc15' },
                        backgroundColor: '#2d2d2d',
                        color: '#fff',
                    },
                    '& .MuiInputBase-input': { color: '#fff' },
                    '& .MuiInputLabel-root': { color: '#9ca3af' },
                }}
            />
            <Button
                variant="contained"
                sx={{
                    bgcolor: '#facc15',
                    color: '#1a1a1a',
                    width: 256,
                    '&:hover': { bgcolor: '#e0ab0e' },
                }}
                onClick={handleNext}
                disabled={currentAnswer.trim() === ''}
                aria-label={currentQuestionIndex === questions.length - 1 ? 'Finish and submit' : 'Continue to next question'}
            >
                {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Continue'}
            </Button>
        </Box>
    );
};

export default QuestionPage;