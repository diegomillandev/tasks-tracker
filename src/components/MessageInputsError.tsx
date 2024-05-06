export const MessageInputsError = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="absolute text-xs mt-0.5 text-red-600">{children}</div>
    );
};
