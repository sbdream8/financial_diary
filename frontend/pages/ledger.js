import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import LedgerForm from "../components/LedgerForm";
import LedgerList from "../components/LedgerList";

export default function LedgerPage() {
  const [ledgers, setLedgers] = useState([]);

  const fetchLedgers = async () => {
    const res = await fetch("/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        query: `
          query {
            ledgers {
              id
              title
              amount
              date
            }
          }
        `,
      }),
    });

    const { data } = await res.json();
    setLedgers(data.ledgers);
  };

  const handleAddLedger = async (ledger) => {
    await fetch("/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        query: `
          mutation {
            addLedger(title: "${ledger.title}", amount: ${ledger.amount}) {
              id
              title
              amount
              date
            }
          }
        `,
      }),
    });

    fetchLedgers();
  };

  useEffect(() => {
    fetchLedgers();
  }, []);

  return (
    <Layout>
      <h2>Household Ledger</h2>
      <LedgerForm onAdd={handleAddLedger} />
      <LedgerList ledgers={ledgers} />
    </Layout>
  );
}
