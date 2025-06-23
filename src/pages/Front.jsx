import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeType } from '../store/slices/testSlice';
import {getQuestionsFront } from '../utils/get_info.js';

const Front = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleFrontendClick = async () => {
        try {
            dispatch(changeType('frontend'));
            await getQuestionsFront(); // Optional pre-fetch
            navigate('/test');
        } catch (error) {
            console.error('Ошибка при загрузке вопросов для Frontend:', error);
            alert('Не удалось загрузить вопросы для Frontend. Попробуйте снова.');
        }
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
            <Typography variant="h3" gutterBottom>
                Tests pour les stagiaires de Quantum Insight
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: '500px', marginBottom: '40px' }}>
                Passez un court test dans la direction choisie. Les réponses nous aideront à évaluer votre niveau de préparation.
            </Typography>
            <Box sx={{ display: 'flex', gap: '20px' }}>
                <Button
                    variant="outlined"
                    onClick={handleFrontendClick}
                    sx={{
                        borderColor: '#ffd700',
                        color: '#ffd700',
                        padding: '10px 30px',
                        fontSize: '1.2rem',
                        '&:hover': {
                            borderColor: '#fff',
                            color: '#fff',
                        },
                    }}
                >
                    Frontend
                </Button>
            </Box>
        </Box>
    );
};

export default Front;