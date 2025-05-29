import Button from "./Button";

const Main = (): React.ReactNode => {
    return (

            <ul className="container mx-auto grid grid-cols-2 gap-7 text-md sm:text-2xl sm:gap-4 text-gray-300 py-10">
                <Button text="Calm" link="/mood/calm" />
                <Button text="Happy" link="/mood/happy" />
                <Button text="Romantic" link="/mood/romantic" />
                <Button text="Energetic" link="/mood/energetic" />
                <Button text="Focused" link="/mood/focused" />
                <Button text="Sad" link="/mood/sad" />
                <Button text="Confident" link="/mood/confident" />
                <Button text="Angry" link="/mood/angry" />
                <Button text="Motivated" link="/mood/motivated" />
                <Button text="Dreamy" link="/mood/dreamy" />
            </ul>
        
    )
};

export default Main;