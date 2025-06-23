import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ThankYouPage = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                bgcolor: '#1a1a1a',
                color: '#fff',
                p: 3,
            }}
        >
            <Typography variant="h4" sx={{ mb: 2 }}>
                Спасибо за ваше время!
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, textAlign: 'center', maxWidth: '600px' }}>
                Мы ценим ваш вклад и надеемся, что вам понравился наш тест. Если у вас есть вопросы или предложения, пожалуйста, свяжитесь с нами.
            </Typography>
            <Button
                variant="contained"
                sx={{
                    bgcolor: '#facc15',
                    color: '#1a1a1a',
                    '&:hover': { bgcolor: '#e0ab0e' },
                }}
                onClick={handleGoHome}
            >
                Вернуться на главную
            </Button>
        </Box>
    );
};

export default ThankYouPage;