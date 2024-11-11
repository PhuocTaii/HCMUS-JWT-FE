import { useUser } from "../context/AuthContext";

const Home = () => {
    const {user} = useUser();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <a className="text-[56px]">Hello</a>
            <a className="text-[28px]">{user?.email}</a>
        </div>
    )
}

export default Home;