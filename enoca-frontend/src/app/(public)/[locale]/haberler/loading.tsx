export default function Loading() {
  return (
    <div className="bg-background min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Skeleton */}
        <div className="flex flex-col items-center mb-16">
          <div className="w-48 h-10 bg-muted animate-pulse rounded-lg mb-4"></div>
          <div className="w-96 h-4 bg-muted animate-pulse rounded-lg max-w-full"></div>
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-card rounded-3xl border border-border overflow-hidden shadow-sm flex flex-col h-full animate-pulse">
              <div className="w-full h-48 sm:h-56 bg-muted"></div>
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-24 h-4 bg-muted rounded"></div>
                  <div className="w-20 h-6 bg-muted rounded-full"></div>
                </div>
                <div className="w-full h-8 bg-muted rounded-lg mb-3"></div>
                <div className="w-3/4 h-8 bg-muted rounded-lg mb-6"></div>
                <div className="space-y-2 mb-8">
                  <div className="w-full h-4 bg-muted rounded"></div>
                  <div className="w-5/6 h-4 bg-muted rounded"></div>
                  <div className="w-4/6 h-4 bg-muted rounded"></div>
                </div>
                <div className="mt-auto w-32 h-6 bg-muted rounded"></div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
