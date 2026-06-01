interface ErrorProps {
  message: string
}

const Error = ({ message }: ErrorProps) => {
  return (
    <div className="w-full h-screen flex items-center justify-center gap-4 bg-red-500 text-red-700">
      <p>Error: </p> <span>{message}</span>
    </div>
  );
};

export default Error;
