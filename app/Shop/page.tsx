
import Breadcrumb from "./components/Breadcrumb";
import ShopSideBarCategory from "./components/ShopSideBarCategory";

type RawProduct = {
  _id: string;
  name: string;
  price: number;
  image: string | string[];
  slug: string;
  description: string;
  category?: {
    _id: string;
    name: string;
    image?: string;
  };  
};

type RawCategory = {
  _id: string;
  name: string;
  image?: string;
};

export default async function ShopPage() {
  // Lấy sản phẩm
  const res = await fetch("http://localhost:8080/products", { cache: "no-store" });
  const data = await res.json();
  const products = (data.data as RawProduct[] || []).map((prod) => {
    let image = prod.image;
    if (typeof image === 'string' && image.startsWith('[')) {
      try {
        const arr = JSON.parse(image);
        if (Array.isArray(arr) && arr.length > 0) image = arr[0];
      } catch {}
    }
    if (Array.isArray(image) && image.length > 0) image = image[0];
    return {
      id: prod._id,
      name: prod.name,
      price: prod.price,
      image: image,
      slug: prod.slug,
      description: prod.description,
      category: prod.category,
    };
  });

  // Lấy danh mục
  const resCat = await fetch("http://localhost:8080/categories", { cache: "no-store" });
  const dataCat = await resCat.json();
  const categories = (dataCat.data as RawCategory[] || []).map((cat) => ({
    id: cat._id,
    name: cat.name,
    image: cat.image,
  }));

  return (
    <main>
      <div className="max-w-7xl mx-auto px-4 ">
        <Breadcrumb />
        <h1 className="text-7xl font-bold text-green-600 text-center mb-8">Shop</h1>
        <ShopSideBarCategory products={products} categories={categories} />
      </div>
    </main>
  );
}