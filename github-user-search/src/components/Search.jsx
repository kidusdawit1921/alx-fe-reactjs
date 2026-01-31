import { useState } from "react";
import { fetchUserData } from "../services/githubService";

function Search() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username && !location && !minRepos) return;

    setLoading(true);
    setError(false);
    setUsers([]);

    try {
      const data = await fetchUserData(username, location, minRepos);
      setUsers(data.items || []);
      if (!data.items || data.items.length === 0) setError(true);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-sky-950 shadow-md rounded-lg p-4 mb-6"
      >
        <h2 className="text-xl font-semibold mb-4">Advanced GitHub User Search</h2>
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Minimum Repositories"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-200"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">Looks like we cant find the user</p>}

      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center space-x-4 bg-white p-3 rounded shadow"
          >
            <img src={user.avatar_url} alt={user.login} className="w-16 h-16 rounded-full" />
            <div>
              <h3 className="text-lg font-bold">{user.login}</h3>
              <p className="text-sm text-gray-600">
                Profile:{" "}
                <a
                  href={user.html_url}
                  className="text-blue-500"
                  target="_blank"
                  rel="noreferrer"
                >
                  {user.html_url}
                </a>
              </p>
              {user.location && <p className="text-sm">📍 {user.location}</p>}
              {user.public_repos !== undefined && (
                <p className="text-sm">📂 Repos: {user.public_repos}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
