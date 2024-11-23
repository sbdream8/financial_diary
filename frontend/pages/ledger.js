import { useState, useEffect } from 'react';
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

const CREATE_LEDGER = gql`
  mutation CreateLedger($date: String!, $category: String!, $amount: Float!, $description: String) {
    createLedger(date: $date, category: $category, amount: $amount, description: $description) {
      id
      date
      category
      amount
      description
    }
  }
`;

export default function Ledger() {
  const { data, refetch } = useQuery(GET_LEDGERS, { client });
  const [createLedger] = useMutation(CREATE_LEDGER, { client });

  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createLedger({ variables: { date, category, amount: parseFloat(amount), description } });
      alert('Ledger created successfully!');
      refetch();
    } catch (err) {
      alert('Failed to create ledger: ' + err.message);
    }
  };

  return (
    <div>
      <h1>Manage Your Budget</h1>
      <form onSubmit={handleSubmit}>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
        <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button type="submit">Add Ledger</button>
      </form>
      <ul>
        {data?.getLedgers?.map((ledger) => (
          <li key={ledger.id}>
            {ledger.date} - {ledger.category}: ${ledger.amount} ({ledger.description})
          </li>
        ))}
      </ul>
    </div>
  );
}
