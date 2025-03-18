import RingLoader from "react-spinners/RingLoader";

interface LoadingProps {
    loading: boolean;
}

const Loading = ({ loading }: LoadingProps) => {
    return (<div>
        <RingLoader
            color={"red"}
            loading={loading}
            cssOverride={{}}
            // size={25}
            speedMultiplier={0.75}
            aria-label="Loading Spinner"
            data-testid="loader"

        />
    </div>);
}

export default Loading;