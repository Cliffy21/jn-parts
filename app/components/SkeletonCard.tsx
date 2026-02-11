export default function SkeletonCard() {
  return (
    <div className="bg-zinc-900 rounded-2xl overflow-hidden shadow-lg animate-pulse">
      <div className="relative h-56 w-full bg-zinc-800" />
      <div className="p-4 space-y-2">
        <div className="h-5 bg-zinc-800 rounded w-3/4" />
        <div className="h-4 bg-zinc-800 rounded w-full" />
        <div className="h-4 bg-zinc-800 rounded w-5/6" />
        <div className="pt-2 space-y-1">
          <div className="h-6 bg-zinc-800 rounded w-1/3" />
          <div className="h-4 bg-zinc-800 rounded w-1/4" />
        </div>
      </div>
    </div>
  );
}
