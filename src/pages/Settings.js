import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { IoIosArrowRoundBack } from 'react-icons/io';

import SettingsPage, {
  SettingsForm, FormTitle, FormLabel, FormInput, FormSelect, FormSubmit,
} from './Settings.styles';

class Settings extends React.Component {
  constructor() {
    super();

    const storedConfigs = JSON.parse(localStorage.getItem('apiConfig'));

    this.state = {
      amount: storedConfigs?.amount || '4',
      category: storedConfigs?.category || '',
      categories: [],
      difficulty: storedConfigs?.difficulty || '',
      redirect: false,
      type: storedConfigs?.type || '',
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch('https://opentdb.com/api_category.php');
      const data = await response.json();
      this.setState({ categories: data.trivia_categories });
    } catch {
      this.setState({ redirect: true });
    }
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  onInputChange = ({ target: { name, value } }) => {
    const theInputValueIsValid = /^[0-9]+$/.test(value) || value === '';
    const MAX_INPUT_VALUE = 50;

    if (theInputValueIsValid
      && (value === '' || (Number(value) <= MAX_INPUT_VALUE && Number(value) > 0))) {
      this.setState({ [name]: value });
    }
  };

  onSubmit = () => {
    const { amount, category, difficulty, type } = this.state;

    localStorage.setItem('apiConfig', JSON.stringify({
      amount: amount !== '' ? amount : 1,
      category,
      difficulty,
      type,
    }));

    this.setState({ redirect: true });
  };

  render() {
    const { amount, category, categories, difficulty, redirect, type } = this.state;

    if (redirect) return <Redirect to="/" />;

    return (
      <SettingsPage>
        <SettingsForm>
          <FormTitle>
            <Link to="/">
              <IoIosArrowRoundBack />
            </Link>

            <h1>Settings</h1>
          </FormTitle>

          <FormLabel htmlFor="amount">
            Amount:
            <FormInput
              id="amount"
              name="amount"
              onChange={ this.onInputChange }
              type="number"
              value={ amount }
            />
          </FormLabel>

          <FormLabel htmlFor="category">
            Category:
            <FormSelect
              id="category"
              name="category"
              onChange={ this.handleChange }
              value={ category }
            >
              <option value="">Any Category</option>
              { categories.map(({ id, name }) => (
                <option key={ id } value={ id }>{name}</option>
              )) }
            </FormSelect>
          </FormLabel>

          <FormLabel htmlFor="difficulty">
            Difficulty:
            <FormSelect
              id="difficulty"
              name="difficulty"
              onChange={ this.handleChange }
              value={ difficulty }
            >
              <option value="">Any Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </FormSelect>
          </FormLabel>

          <FormLabel htmlFor="type">
            Type:
            <FormSelect
              id="type"
              name="type"
              onChange={ this.handleChange }
              value={ type }
            >
              <option value="">Any Type</option>
              <option value="multiple">Multiple Choice</option>
              <option value="boolean">True / False</option>
            </FormSelect>
          </FormLabel>

          <FormSubmit onClick={ this.onSubmit } type="button">Save</FormSubmit>
        </SettingsForm>

      </SettingsPage>
    );
  }
}

export default Settings;
