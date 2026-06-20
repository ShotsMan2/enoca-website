export default function Loading() {
  return (
    <div className="bg-background min-h-screen pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Skeleton */}
        <div className="flex flex-col items-center mb-16">
          <div className="w-64 h-12 bg-muted animate-pulse rounded-lg mb-4"></div>
          <div className="w-3/4 h-4 bg-muted animate-pulse rounded-lg max-w-full"></div>
        </div>

        {/* List Skeleton */}
        <div className="space-y-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 animate-pulse">
              <div className="flex-1 w-full space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-6 bg-muted rounded-full"></div>
                  <div className="w-24 h-4 bg-muted rounded"></div>
                </div>
                <div className="w-3/4 h-8 bg-muted rounded-lg"></div>
                <div className="w-1/2 h-4 bg-muted rounded"></div>
              </div>
              <div className="w-full md:w-32 h-12 bg-muted rounded-xl shrink-0 mt-4 md:mt-0"></div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
