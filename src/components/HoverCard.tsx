import { Drawer } from "./ui/drawer";

const HoverCard = () => {
    return (
        <Drawer >
            <div className="p-20 absolute">
                <h1>Hover Card</h1>
                <p>Esse é um card flutuante</p>
            </div>
        </Drawer>
    );
}

export default HoverCard;