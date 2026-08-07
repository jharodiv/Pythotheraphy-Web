interface SpinnerProps {
    size?: number;
}

export default function Spinner({
    size = 20,
}: SpinnerProps) {
    return (
        <div
            style={{
                width: size,
                height: size,
            }}
            className="animate-spin rounded-full border-4 border-gray-300 border-t-green-700"
        />
    );
}