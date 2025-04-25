import React, { useState, useEffect } from 'react';
import './index.scss';
import lupaIcon from '../../assets/Frame 52.svg';
import gitHubIcon from '../../assets/image 1.svg';
import imgBack from '../../assets/camada_1.svg';

function GitHubUser() {
  const [userData, setUserData] = useState(null); 
  const [inputValue, setInputValue] = useState('');
  const [username, setUsername] = useState(''); 
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!username) return;

    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) throw new Error('Usuário não encontrado');
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Erro ao buscar dados do GitHub:', error);
        setUserData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  const handleSearch = () => {
    if (inputValue.trim() !== '') {
      setUsername(inputValue.trim());
    }
  };

  return (
    <div className="githubUserContainer">
        <div className='backDesign'>
            <div className='design'>
                <img src={imgBack} />
                <div className='ellips1'></div>
            </div>
            <div className='ellips2'></div>
        </div>



        <div className='conteinerGithub'>
            <div className='githubContent'>
                <img className="gitHubIcon"src={gitHubIcon}/>
                <p className='textPefil'>Perfil</p>
                <p className='textGithub'>GitHub</p>
            </div>

            <div className="search-box">
                <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Digite o nome do usuário"
                />
                <button onClick={handleSearch}>
                <img src={lupaIcon} alt="Buscar" />
                </button>
            </div>

            {isLoading && <p>Carregando...</p>}

            {!isLoading && userData && (
            <div className="userProfile">
                <div className='imgUser'>
                    <img src={userData.avatar_url} alt="Avatar do usuário" />
                </div>
                <div>
                    <p className='loginUser'>{userData.login}</p>
                    <p className='bioUser'>{userData.bio || "Esse usuário não possui uma bio."}</p>
                </div>
                
            </div>
            )}

            {!isLoading && username && !userData && (
                <div className='notFound'>   
                    <p>
                        Nenhum perfil foi encontrado com ese nome de usuário.<br/>          
                        Tente novamente
                    </p>
                </div>
            )}
          
        </div>
    </div>
  );
}

export default GitHubUser;