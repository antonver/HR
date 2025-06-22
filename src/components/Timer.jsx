import { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';

// Custom hook for timer
const useTimer = (initialTime = 0) => {
    const [time, setTime] = useState(initialTime);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setTime((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const startTimer = () => setIsRunning(true);
    const stopTimer = () => setIsRunning(false);
    const resetTimer = () => {
        setIsRunning(false);
        setTime(0);
    };

    return { time, isRunning, startTimer, stopTimer, resetTimer };
};

// Format time in MM:SS
const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// Timer Component
const Timer = () => {
    const { time, isRunning, startTimer, stopTimer, resetTimer } = useTimer(0);

    return (
        <Box
            sx={{
                bgcolor: 'grey.100',
                p: 2,
                borderRadius: 2,
                boxShadow: 1,
                textAlign: 'center',
                maxWidth: 300,
                mx: 'auto',
            }}
        >
            <Typography variant="h6" component="h2" gutterBottom>
                Timer
            </Typography>
            <Typography variant="h4" component="p" fontFamily="monospace" gutterBottom>
                {formatTime(time)}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mt: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={startTimer}
                    disabled={isRunning}
                >
                    Start
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    onClick={stopTimer}
                    disabled={!isRunning}
                >
                    Stop
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={resetTimer}
                >
                    Reset
                </Button>
            </Box>
        </Box>
    );
};

export default Timer;
