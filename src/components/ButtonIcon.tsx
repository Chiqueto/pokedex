import { Button } from "./ui/button";

interface ButtonProps {
    onClick: () => void
    icon: React.ReactNode
}

const ButtonIcon = ({ icon, onClick }: ButtonProps) => {
    return (

        <Button
            className="bg-base-red border border-black p-2 rounded-xl flex items-center justify-center w-12 h-12"
            onClick={onClick}
        >
            {icon}
        </Button>
    );
}

export default ButtonIcon;