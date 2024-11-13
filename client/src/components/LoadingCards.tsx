export default function LoadingCards() {
  return (
    <div className="px-12 pt-4 space-y-8">
      <div>
        <p className="text-black text-2xl font-semibold p-4">Popular shows</p>
      </div>
      <div className="flex flex-wrap gap-2 justify-around">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
          <div className="group bg-gray-400 col-span relative h-[12vw] w-[24%] animate-pulse space-x-4" key={num} />
        ))}
      </div>
    </div>
  );
}
