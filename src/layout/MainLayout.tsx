import { Button } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <>
            <div className="flex pt-5 justify-end space-x-4">
                <Link to='/profile'>
                    <Button variant="outlined" className="">
                        Profile
                    </Button>
                </Link>
                
                <Link to='/login' onClick={() => localStorage.clear()}>
                    <Button variant="outlined" className="">
                        Logout
                    </Button>
                </Link>
            </div>
            <Outlet />
        </>
    );
}

export default MainLayout;