const fetchTrivia = async () => {
  let defaultConfigs = { amount: '5', category: '', difficulty: '', type: '' };

  // const token = localStorage.getItem('token'); &token=${token}
  const storedConfigs = JSON.parse(localStorage.getItem('apiConfig'));

  if (storedConfigs) defaultConfigs = { ...storedConfigs };

  const { amount, category, difficulty, type } = defaultConfigs;

  const URL_API = `https://opentdb.com/api.php?amount=${amount}&category=${category
  }&difficulty=${difficulty}&type=${type}`;

  const response = await fetch(URL_API);
  return response.json();
};

export default fetchTrivia;
