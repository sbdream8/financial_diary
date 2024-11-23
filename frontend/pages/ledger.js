import { gql, useQuery, useMutation } from '@apollo/client';
import client from '../apollo-client';

const GET_LEDGERS = gql`
  query GetLedgers {
    getLedgers {
      id
      date
      category
      amount
      description
    }
  }
`;

export default function Ledger() {
  const { data, loading, error } = useQuery(GET_LEDGERS, { client });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Your Ledger</h1>
      <ul>
        {data.getLedgers.map((ledger) => (
          <li key={ledger.id}>
            {ledger.date} - {ledger.category} - ${ledger.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}
