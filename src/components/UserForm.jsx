import { useState, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

export default function UserForm() {
  const [inputName, setInputName] = useState('');
  const navigate = useNavigate();
  const { setName } = useContext(UserContext);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setName(inputName); // Set the name in context
      navigate("/quiz");
    },
    [inputName, navigate, setName]
  );

  return (
    <form onSubmit={handleSubmit}>
      <label>Name: </label>
      <input value={inputName} onChange={(e) => setInputName(e.target.value)}></input>
      <button>Start Quiz</button>
    </form>
  );
}