import { TextField, Button } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "../config/AxiosConfig";
import { AxiosError } from "axios";


type SignUpProps = {
    username: string
    email: string;
    password: string;
}

type ErrorResponse = {
    message: string;
}

const SignUp = () => {
    const { register, handleSubmit, control, reset } = useForm<SignUpProps>();
    const navigate = useNavigate();

    const onSubmit = async (data: SignUpProps) => {
        try{
            const response = await axios.post(`/user/register`, {
                username: data.username,
                email: data.email,
                password: data.password
            });
            if(response.status === 200){
                reset();
                navigate("/");
            }
        } catch (error) {
            const err = error as AxiosError<ErrorResponse>

            const errMessage = err.response?.data.message || err.message || "An unexpected error occurred";
            return (
                alert(errMessage)
            )
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="username"
                    control={control}
                    rules={{ required: "Username is required" }}
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                            {...field}
                            label="Username"
                            variant="outlined"
                            type="username"
                            error={!!error}
                            helperText={error ? error.message : null}
                            fullWidth
                            margin="normal"
                            {...register("username", { required: true })}
                        />
                    )}
                />
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
                    Sign Up
                </Button>
            </form>
            <h3>Already have account? <Link to = "/login" className="text-blue-400">Login</Link></h3>
        </>
    );
};

export default SignUp;