import { FormControl, InputLabel, FormHelperText, Input, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLogin } from '../store/slices/loginSlice.js'; // Adjust the path as needed

const Login = () => {
    const username = useSelector((state) => state.login.value); // Access the value from the slice
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        dispatch(setLogin(event.target.value)); // Dispatch the setLogin action with the input value
    };


    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission
        if (username.trim()) {
            navigate('/test'); // Navigate to /test route
        }
    };

    return (
        <form onSubmit={handleSubmit}> {/* Wrap in a form element */}
            <FormControl sx={{ color: 'blue', width: '300px' }} variant="standard">
                <InputLabel htmlFor="my-input" sx={{ color: 'yellow' }}>
                    Username
                </InputLabel>
                <Input
                    id="my-input"
                    sx={{ color: 'yellow' }}
                    value={username}
                    onChange={handleUsernameChange} // Use onChange instead of onInput
                />
                <FormHelperText sx={{ color: 'yellow' }}>Enter your username</FormHelperText>
            </FormControl>
            <Button
                type="submit" // Make this the submit button
                variant="contained"
                sx={{ mt: 2, color: 'white', backgroundColor: 'yellow' }}
            >
                Submit
            </Button>
        </form>
    );
};

export default Login;