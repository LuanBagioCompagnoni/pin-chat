export default function searchInputSkeleton() {
  return (
    <form className="m-2">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <div className="w-4 h-4 bg-gray-300 rounded-full animate-pulse"></div>
        </div>
        <div className="block w-full p-2 pl-10 border-2 border-gray-300 rounded-3xl h-10 animate-pulse"></div>
        <div
          className="absolute right-2.5 top-1/2 transform -translate-y-1/2 bg-gray-300 rounded-3xl h-8 w-16 animate-pulse"></div>
      </div>
    </form>
  )
}