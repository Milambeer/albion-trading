export const Error = () => {
  return (
    <div className="min-h-screen bg-dynamic-black">
      <div className="container m-auto">
        <div className="flex flex-col text-center">
          <h1 className="text-2xl text-white">Error</h1>
          <label className="text-white">
            An unexpected error occured, please try again later
          </label>
        </div>
      </div>
    </div>
  );
};

export default Error;
