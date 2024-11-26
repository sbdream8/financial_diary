export default function Layout({ children }) {
    return (
      <div>
        <header>
          <h1>Household Ledger</h1>
        </header>
        <main>{children}</main>
        <footer>
          <p>© 2024 Household Ledger</p>
        </footer>
      </div>
    );
  }
  