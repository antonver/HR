import { Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage';
import Test from './pages/Test';
import {Box} from "@mui/material";

function App() {
    return ( <Box
        sx={{
            height: '100vh',
            backgroundColor: '#1a1a1a',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
            textAlign: 'center',
            padding: '0 20px',
        }}
    >
        <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/test" element={<Test />} />
        </Routes>
        </Box>
    );
}

export default App;