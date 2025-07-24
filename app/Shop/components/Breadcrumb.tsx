import Link from "next/link";

export default function Breadcrumb({ current }: { current?: string }) {
  return (
    <nav className="flex items-center text-gray-600 text-x mb-6 space-x-2">
      <Link href="/" className="hover:text-green-700">Trang chủ</Link>
      <span>{'>'}</span>
      <Link href="/Shop" className="hover:text-green-700">Sản phẩm</Link>
      {current && (
        <>
          <span>{'>'}</span>
          <span className="text-black font-medium">{current}</span>
        </>
      )}
    </nav>
  );
}
