const fetchToken = async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const token = await response.json();
  return token;
};

const getToken = async () => {
  const storedToken = localStorage.getItem('token');
  if (storedToken !== null) {
    return storedToken;
  }

  const token = await fetchToken();
  localStorage.setItem('token', token.token);
  return token.token;
};

export default getToken;
