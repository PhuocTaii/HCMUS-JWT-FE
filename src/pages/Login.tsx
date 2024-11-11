import { TextField, Button } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import axios from "../config/AxiosConfig";
// import { AxiosError } from "axios";
import { useUser } from "../context/AuthContext";


type LoginProps = {
    email: string;
    password: string;
}



const Login = () => {
    const { register, handleSubmit, control, reset } = useForm<LoginProps>();
    const navigate = useNavigate();

    const {login} = useUser();
    const onSubmit = async (data: LoginProps) => {
        // try{
        //     const response = await axios.post(`/auth/login`, {
        //         email: data.email,
        //         password: data.password
        //     });
        //     reset();
        //     window.localStorage.setItem('access_token', response.data.access_token);
        //     // setUser(response.data.user);
        //     navigate("/", {state: {user}});
  
        // } catch (error) {
        //     const err = error as AxiosError<ErrorResponse>

        //     const errMessage = err.response?.data.message || err.message || "An unexpected error occurred";
        //     alert(errMessage);
        // }
        await login(data.email, data.password);
        reset();
        navigate("/");
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="email"
                    control={control}
                    rules={{ required: "Email is required" }}
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                            {...field}
                            label="Email"
                            variant="outlined"
                            type="email"
                            error={!!error}
                            helperText={error ? error.message : null}
                            fullWidth
                            margin="normal"
                            {...register("email", { required: true })}
                        />
                    )}
                />
                <Controller
                    name="password"
                    control={control}
                    rules={{ required: "Password is required" }}
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                            {...field}
                            label="Password"
                            type="password"
                            variant="outlined"
                            error={!!error}
                            helperText={error ? error.message : null}
                            fullWidth
                            margin="normal"
                            {...register("password", { required: true })}
                        />
                    )}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Login
                </Button>
            </form>
            <h3>Don't have account? <Link to = "/signup" className="text-blue-400">Sign Up</Link></h3>
        </>
    );
};

export default Login;