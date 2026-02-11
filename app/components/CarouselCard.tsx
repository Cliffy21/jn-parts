import Image from "next/image";

interface Product {
  id: string;
  title: string;
  description: string;
  price?: number;
  installation_cost?: number;
  images: string[];
}

export default function CarouselCard({ product }: { product: Product }) {
  return (
    <div className="bg-zinc-900 rounded-2xl overflow-hidden shadow-lg">
      <div className="relative h-56 w-full">
        <Image
          src={product.images[0].trim()}
          alt={product.title}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 33vw"
        />
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-white font-semibold">{product.title}</h3>
        <p className="text-sm text-zinc-400">{product.description}</p>

        <div className="pt-2">
          {product.price ? (
            <p className="text-lg font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              KES {product.price.toLocaleString()}
            </p>
          ) : (
            <p className="text-sm text-zinc-500">Request price</p>
          )}

          {product.installation_cost && (
            <p className="text-xs text-zinc-400">
              Installation: KES {product.installation_cost.toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
