const SIGNUP_USER = gql`
  mutation CreateUser($name: String!, $email: String!, $password: String!) {
    createUser(name: $name, email: $email, password: $password)
  }
`;

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const { data } = await createUser({
      variables: { name, email, password },
    });
    console.log('Signup successful!', data);
  } catch (err) {
    console.error('Error during signup:', err.message);
  }
};
