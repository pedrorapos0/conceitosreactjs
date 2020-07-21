import React, {useState, useEffect} from "react";

import api from './services/api';
import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() =>{
    api.get('/repositories').then((response) => setRepositories(response.data));
  }, []);

  async function handleAddRepository() {
   const response = await api.post('/repositories', {
    id: "123",
    url: "https://github.com/josepholiveira",
    title: "Desafio ReactJS",
    techs: ["React", "Node.js"],
  });
   const repository = response.data;
   setRepositories([...repositories, repository]);

  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    const temp = [...repositories];
    const repoIndex = temp.findIndex( repo => repo.id === id);
    temp.splice(repoIndex, 1);
    setRepositories(temp);
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(repo => (<li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
          </li>))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
