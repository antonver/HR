import { useDispatch, useSelector } from 'react-redux';
import { addAnswer } from '../store/slices/answersSlice';
import { clearType } from '../store/slices/testSlice'; // Импортируем clearTestType
import { Button, TextField, Box, Typography, CircularProgress } from '@mui/material';
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
                setError('Type de test invalide sélectionné.');
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
                console.log('Questions reçues:', data);
                setQuestions(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Erreur lors de la récupération des questions:', error);
                setError('Échec du chargement des questions. Veuillez réessayer plus tard.');
            } finally {
                setLoading(false);
            }
        };
        fetchQuestions();
    }, [typeTest]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                <CircularProgress color="primary" />
                <Typography sx={{ ml: 2 }}>Chargement des questions...</Typography>
            </Box>
        );
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    if (!questions || questions.length === 0) {
        return <Typography color="error">Aucune question disponible.</Typography>;
    }

    const currentQuestion = questions[currentQuestionIndex];

    if (!currentQuestion || currentQuestionIndex >= questions.length) {
        return <Typography color="error">Plus de questions disponibles.</Typography>;
    }

    const currentAnswer = answers.find(
        (ans) => ans.question_id === currentQuestion.id && ans.test_id === currentQuestion.test_id
    )?.answer || '';

    const handleNext = async () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            const allAnswers = answers.map((ans) => ({
                test_id: ans.test_id,
                question_id: ans.question_id,
                answer: ans.answer,
            }));
            try {
                console.log('Envoi des réponses:', allAnswers);
                await postAnswers(allAnswers);
                alert('Réponses envoyées avec succès!');
                setCurrentQuestionIndex(0);
                setQuestions([]);
                dispatch(clearType()); // Effacer le type de test après soumission
            } catch (error) {
                console.error('Erreur lors de l\'envoi des réponses:', error);
                alert('Échec de l\'envoi des réponses. Veuillez réessayer.');
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
        dispatch(
            addAnswer({
                test_id: currentQuestion.test_id,
                question_id: currentQuestion.id,
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
                p: 3,
                minHeight: '100vh',
                bgcolor: '#1a1a1a',
                color: '#fff',
            }}
        >
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3, justifyContent: 'center' }}>
                {questions.map((_, i) => (
                    <Box
                        key={i}
                        onClick={() => setCurrentQuestionIndex(i)}
                        sx={{
                            width: 32,
                            height: 32,
                            border: '2px solid #facc15',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: i === currentQuestionIndex ? '#facc15' : 'transparent',
                            color: i === currentQuestionIndex ? '#1a1a1a' : '#facc15',
                            cursor: 'pointer',
                            '&:hover': {
                                opacity: 0.8,
                            },
                        }}
                    >
                        {i + 1}
                    </Box>
                ))}
            </Box>

            <Button
                onClick={handleBack}
                sx={{ color: '#facc15', mb: 2, alignSelf: 'flex-start' }}
                disabled={currentQuestionIndex === 0}
            >
                ← Retour
            </Button>

            <Typography variant="h6" sx={{ mb: 3, maxWidth: '600px', textAlign: 'center' }}>
                {currentQuestion.question_text}
            </Typography>

            <TextField
                variant="outlined"
                placeholder="Tapez votre réponse ici..."
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

            <Button
                variant="contained"
                sx={{
                    bgcolor: '#facc15',
                    color: '#1a1a1a',
                    minWidth: 200,
                    '&:hover': { bgcolor: '#e0ab0e' },
                    '&:disabled': { bgcolor: '#4b5563', color: '#9ca3af' }
                }}
                onClick={handleNext}
                disabled={currentAnswer.trim() === ''}
            >
                {currentQuestionIndex === questions.length - 1 ? 'Terminer' : 'Continuer'}
            </Button>
        </Box>
    );
};

export default QuestionPage;