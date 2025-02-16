import Link from "next/link";
import prisma from "../lib/db";
import { ProductCard } from "./ProductCard";

async function getData() {
  const data = await prisma.product.findMany({
    select: {
      price: true,
      smallDescription: true,
      category: true,
      name: true,
      id: true,
      images: true,
    },
    take: 4,
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export const NewestProducts = async () => {
  const data = await getData();
  return (
    <section className="mt-12">
      <div className="md:flex md:items-center md:justify-between">
        <h2 className="text-2xl font-extrabold tracking-tighter">
          Newest Product
        </h2>
        <Link
          href="#"
          className="text-primary text-sm hidden font-medium hover:text-primary/90 md:block">
          All Product
          <span>&rarr;</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt-4 gap-10">
        {data.map((product) => (
          <ProductCard
            images={product.images}
            key={product.id}
            title={product.name}
            price={product.price}
            smallDescription={product.smallDescription}
            id={product.id}
          />
        ))}
      </div>
    </section>
  );
};
