

const CardLoading = () => {
    return (
      <div className="container p-2 border grid gap-3 max-w-36 lg:max-w-52 rounded animate-pulse border-gray-400">
        <div className="min-h-12 lg:min-h-20 bg-blue-50"></div>
        <div className="p-2 bg-blue-100 rounded w-12 lg:w-20"></div>
        <div className="p-2 bg-blue-100 rounded"></div>
        <div className="p-2 bg-blue-100 rounded w-12 lg:w-20"></div>

        <div className="flex items-center justify-between gap-3">
          <div className="p-2 bg-blue-100 rounded w-12 lg:w-20"></div>
          <div className="p-2 bg-blue-100 rounded w-12 lg:w-20"></div>
        </div>
      </div>
    );
};

export default CardLoading;