function LoadingPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full border-t-4 border-blue-500 border-solid h-16 w-16"></div>
      <p className="ml-4 text-gray-600">Loading</p>
    </div>
  );
}

export default LoadingPage;
