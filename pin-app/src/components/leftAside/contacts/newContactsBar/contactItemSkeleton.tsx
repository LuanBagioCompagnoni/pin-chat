export default function contactItemSkeleton() {
  return (
    <div
      className="hover:bg-[#e8e8e8] w-[98%] h-16 items-center justify-center rounded-2xl mb-2 cursor-pointer bg-[#F8F8F8]"
    >
      <div>
        <div className="w-full h-full py-2 relative flex animate-pulse">
          <div className="relative">
            <div className="rounded-full bg-gray-300 w-[50px] h-[50px] ml-4"></div>
          </div>

          <div className="flex flex-col justify-center ml-4 w-full">
            <div className="h-4 bg-gray-300 rounded w-3/5 mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-4/5"></div>
          </div>

          <div className="absolute right-2 bottom-3">
            <div className="h-3 bg-gray-300 rounded w-10"></div>
          </div>

        </div>
      </div>
    </div>
  )
}