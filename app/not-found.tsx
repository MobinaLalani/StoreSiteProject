// app/not-found.tsx

import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <h1>404</h1>
      <h2>صفحه مورد نظر پیدا نشد</h2>

      <Link href="/">بازگشت به صفحه اصلی</Link>
    </main>
  );
}
