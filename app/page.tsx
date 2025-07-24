import ShowSP from './Home/ShowSP';
export default function Home() {
  return (
    <main className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <ShowSP type="featured" title="Sản Phẩm Nổi Bật" />
        <div className="my-16"></div>
        <ShowSP type="hot" title="Sản Phẩm Hot" />
      </div>
    </main>
  );
}
