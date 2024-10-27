import { useState } from 'react'

function App() {
  const [language, setLanguage] = useState('javascript');
  const [repo, setRepo] = useState(null);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);

  // Fetches a random repository based on the selected language
  const fetchRandomRepo = async() => {
    setLoading(true);
    setError(null);
    setRepo(null);
    try {
      const response = await fetch(`https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc`);
      const data = await response.json();
      if (data.items.length > 0) {
        const randomRepo = data.items[Math.floor(Math.random() * data.items.length)];
        setRepo(randomRepo);
      } else {
        setRepo('No repositories found');
      }

    } catch (err) {
      setError('Error fetching repositories')
    } finally{
      setLoading(false);
    }

  }

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">GitHub Repository Finder</h1>
        
        {/* Dropdown to select language */}
        <select 
          value={language} 
          onChange={(e) => setLanguage(e.target.value)}
          className="p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="ruby">Ruby</option>
          <option value="go">Go</option>
          <option value="java">Java</option>
          {/* Add more languages if needed */}
        </select>

        {/* Button to fetch repository */}
        <button 
          onClick={fetchRandomRepo}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mt-4 shadow-lg"
        >
          Fetch Repository
        </button>

        {/* Loading, Error, or Repository Info */}
        {loading && <p className="mt-4 text-gray-600">Loading...</p>}
        {error && <p className="mt-4 text-red-500">{error}</p>}
        {repo && typeof repo === 'string' && <p className="mt-4 text-gray-600">{repo}</p>}
        {repo && typeof repo !== 'string' && (
          <div className="bg-white shadow-md rounded-md p-6 mt-6 w-full max-w-xl">
            <h3 className="text-2xl font-bold text-gray-800">{repo.name}</h3>
            <p className="mt-2 text-gray-600">{repo.description}</p>
            <div className="mt-4 flex space-x-4">
              <span className="inline-block bg-yellow-300 text-yellow-800 text-sm font-semibold px-3 py-1 rounded-full">⭐ Stars: {repo.stargazers_count}</span>
              <span className="inline-block bg-green-300 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">🍴 Forks: {repo.forks_count}</span>
              <span className="inline-block bg-red-300 text-red-800 text-sm font-semibold px-3 py-1 rounded-full">🔓 Open Issues: {repo.open_issues_count}</span>
            </div>

            {/* Button to refresh the repository */}
            <button 
              onClick={fetchRandomRepo}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mt-4"
            >
              Refresh
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default App
