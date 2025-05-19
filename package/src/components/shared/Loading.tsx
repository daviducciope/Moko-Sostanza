const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-2">Caricamento...</p>
      </div>
    </div>
  );
};

export default Loading;
