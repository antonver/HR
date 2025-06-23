import { Routes, Route } from 'react-router-dom';
import StartPage from './pages/Front.jsx';
import Test from './pages/Test';
import {Box} from "@mui/material";
import Front from "./pages/Front.jsx";
import Back from "./pages/Back.jsx";
import ThankYouPage from "./pages/ThankYouPage.jsx";

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
            <Route path="/frontend" element={<Front />} />
            <Route path="/backend" element={<Back />} />
            <Route path="/test" element={<Test />} />
            <Route path="/end" element={<ThankYouPage />} />
        </Routes>
        </Box>
    );
}

export default App;