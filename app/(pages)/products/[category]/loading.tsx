import { LoadingProductCard } from "@/app/components/ProductCard";

const Loading = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1 sm:gird-cols-2 gap-10 lg:grid-cols-3 mt-4">
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
      </div>
    </div>
  );
};

export default Loading;
