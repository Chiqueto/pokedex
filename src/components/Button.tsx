import { Search } from "lucide-react";

const button = () => {
    return (
        <button className="bg-base-red border border-black p-2 rounded-xl">
            <div className="text-white w-7 h-7 text-center">
                <Search className="w-full h-full" />
            </div>
        </button>
    );
}

export default button;