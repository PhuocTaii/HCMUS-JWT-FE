// import axios from "axios";
// import { useEffect, useState } from "react";
import { useUser } from "../context/AuthContext";

// interface User {
//     username: string;
//     email: String
// }

const Profile = () => {
    // const [user, setUser] = useState<User>();

    const {user} = useUser();

    // const fetchUserProfile = async () => {
    //     const token = window.localStorage.getItem('access_token');
    //     console.log(token);
    //     if(!token){
    //         window.location.href = "/login";
    //         return;
    //     }
    //     try {
    //         const response = await axios.get('/user/profile', {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         });
    //         setUser(response.data);
    //     } catch (error) {
    //         console.error("Error fetching user profile:", error);
    //     }
    // }


    // useEffect(() => {
    //     // fetchUserProfile();
    //     profile();
    // }, []);

    return (
        <div className="flex justify-center max-w-screen">
            <div className="flex justify-center gap-4 w-fit">
                <div className="border border-black p-4 rounded-sm w-full">
                    <p>Username: {user?.username}</p>
                </div>
                <div className="border border-black p-4 rounded-sm w-full">
                    <p>Email: {user?.email}</p>
                </div>
            </div>
        </div>
    );
}

export default Profile;