export default function DashboardLoading() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="h-7 w-40 bg-gray-200 rounded mb-2" />
          <div className="h-4 w-60 bg-gray-200 rounded" />
        </div>
        <div className="h-10 w-36 bg-gray-200 rounded-lg" />
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl border p-5">
            <div className="h-3 w-12 bg-gray-200 rounded mb-3" />
            <div className="h-8 w-16 bg-gray-200 rounded" />
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border">
        <div className="px-6 py-4 border-b">
          <div className="h-5 w-36 bg-gray-200 rounded" />
        </div>
        <div className="p-12 space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-4 w-full bg-gray-200 rounded" />
          ))}
        </div>
      </div>
    </div>
  )
}
