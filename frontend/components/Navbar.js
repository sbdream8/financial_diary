import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <Link href="/ledger">Ledger</Link>
      <Link href="/mypage">My Page</Link>
      <Link href="/register">Register</Link>
    </nav>
  );
}
