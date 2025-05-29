import { Link } from "react-router";

const Navbar = (): React.ReactNode => {
    return (
        <nav>
            <div className="container mx-auto text-gray-200 text-3xl text-center font-bold mt-10 mb-5 overflow-hidden">
                <Link to="/">
                    <h1 className="transition-transform duration-50 hover:scale-110 hover:cursor-pointer inline-block">
                        MoodToMusic
                    </h1>
                </Link>
            </div>
        </nav>
    )
};

export default Navbar;