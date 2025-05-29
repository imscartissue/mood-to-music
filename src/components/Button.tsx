import { Link } from "react-router";

interface ButtonProp {
    text: string;
    link: string;
}

const Button = ({text, link}: ButtonProp): React.ReactNode => {
    return (
        <Link to={link} className="bg-yellow-700 rounded-2xl p-1 sm:p-2 hover:bg-yellow-800 hover:cursor-pointer transition-colors duration-50 ease-in-out text-center">
			{text}
		</Link>
    )
};

export default Button;