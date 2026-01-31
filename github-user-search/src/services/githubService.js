import axios from "axios";

export const fetchUserData = async (username, location, minRepos) => {
  let query = "";

  if (username) query += `${username} `;
  if (location) query += `location:${location} `;
  if (minRepos) query += `repos:>=${minRepos}`;

  
  const response = await axios.get(`https://api.github.com/search/users?q=${query.trim()}`);

  
  const detailedUsers = await Promise.all(
    response.data.items.map(async (user) => {
      try {
        const userDetails = await axios.get(user.url);
        return { ...user, ...userDetails.data };
      } catch {
        return user; 
      }
    })
  );

  return { items: detailedUsers };
};
