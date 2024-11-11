import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <div className="flex w-full justify-center min-h-screen items-center">
            <div className="w-[600px]">
                <Outlet />
            </div>
        </div>
    );
}

export default AuthLayout;