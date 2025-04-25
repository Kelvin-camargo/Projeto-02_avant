import React, { useState, useEffect } from 'react';

function GitHubUser() {
  const [userData, setUserData] = useState(null); 
  const username = 'kelvin-camargo'; 

  useEffect(() => {

    fetch(`https://api.github.com/users/${username}`)
      .then(response => response.json()) 
      .then(data => setUserData(data)) 
      .catch(error => console.error('Erro ao buscar dados do GitHub:', error));
  }, []);

  if (!userData) {
    return <p>Carregando...</p>;
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <p>@{userData.login}</p>
      <img src={userData.avatar_url} alt="Avatar" style={{ width: '150px', borderRadius: '50%' }} />

      <p>Bio: {userData.bio || "Esse usuario não possue uma bio"}</p>
    </div>
  );
}

export default GitHubUser;
