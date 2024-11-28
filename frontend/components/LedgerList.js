export default function LedgerList({ ledgers }) {
  return (
    <ul>
      {ledgers.map((ledger) => (
        <li key={ledger.id}>
          <strong>{ledger.title}</strong>: ${ledger.amount} -{" "}
          {new Date(ledger.date).toLocaleDateString()}
        </li>
      ))}
    </ul>
  );
}
