import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    getRepos();
  }, []);

  async function getRepos() {
    const response = await api.get("/repositories");
    console.log(response.data);
    setRepos(response.data);
  }

  async function handleAddRepository() {
    const response = await api.post("/repositories", {
      title: `Repository ${Date.now()}`,
      url: `https://github.com/repository${Date.now()}`,
      techs: ["React.js"],
    });
    console.log(response.data);
    const repo = response.data;
    setRepos([...repos, repo]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);
    console.log(response);
    const index = repos.findIndex((repo) => repo.id == id);
    repos.splice(index, 1);
    setRepos([...repos]);
  }

  // This way also works, but won't pass the test.

  // async function handleRemoveRepository(id) {
  //   const response = await api.delete(`/repositories/${id}`);
  //   console.log(response);
  //   getRepos();
  // }

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
