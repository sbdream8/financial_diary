export default function Layout({ children }) {
  return (
    <div>
      <header>
        <h1>Financial Diary</h1>
        <Navbar />
      </header>
      <main>{children}</main>
    </div>
  );
}
