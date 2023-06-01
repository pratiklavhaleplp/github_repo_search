import './App.css';
import { useEffect, useState } from 'react';

// library through which we can call the repositor search api
import { Octokit } from "octokit";
import RepoCard from './RepoCard/RepoCard';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [responseData, setResponseData] = useState([]);

  // git hub token
  const githubToken = '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';
  const fetchData = async () => {
    const octokit = new Octokit({
      auth: githubToken
    });

    // Search API call
    const data = await octokit.request(`https://api.github.com/search/repositories?q=${searchQuery}`, {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });
    setResponseData(data.data.items);
  }
  useEffect(() => {

    // using this setTimeout function for debouncing 
    const timer = setTimeout(() => {
      if (searchQuery)
        fetchData();
      else
        setResponseData([]);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  return (
    <div className="App">
      <div className='header'>
        <input className='style-input' placeholder='Search repository here!!!'
          onChange={handleInputChange} />
      </div>
      <div className='card-section'>
        <RepoCard responseData={responseData} />
      </div>
    </div>
  );
}

export default App;
