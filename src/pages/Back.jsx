import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeType } from '../store/slices/testSlice';
import { getQuestionsBack } from '../utils/get_info.js';

const Back = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleBackendClick = async () => {
        try {
            dispatch(changeType('backend'));
            await getQuestionsBack(); // Optional pre-fetch
            navigate('/test');
        } catch (error) {
            console.error('Ошибка при загрузке вопросов для Backend:', error);
            alert('Не удалось загрузить вопросы для Backend. Попробуйте снова.');
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
            <Box>
                <Button
                    variant="outlined"
                    onClick={handleBackendClick}
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
                    Backend
                </Button>
            </Box>
        </Box>
    );
};

export default Back;