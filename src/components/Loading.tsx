import RingLoader from "react-spinners/RingLoader";

interface LoadingProps {
    loading: boolean;
    color?: string;
    size?: number;
}

const Loading = ({ loading, color, size }: LoadingProps) => {
    return (<div className="flex justify-center items-center h-screen">
        <RingLoader
            color={color || "red"}
            loading={loading}
            cssOverride={{}}
            size={size || 100}
            speedMultiplier={0.75}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    </div>);
}

export default Loading;