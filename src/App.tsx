import { useEffect, useState } from "react";

interface Repo {
  name: string;
  description: string;
}

interface AppProps {
  list: number[];
}

export function App({ list }: AppProps) {
  const [repos, setRepos] = useState<Repo[]>([]);
  // const [filteredRepos, setFilteredRepos] = useState<Repo[]>([]);
  const [search, setSearch] = useState<string>("");

  console.log("Renderizou");

  useEffect(() => {
    fetch("https://api.github.com/users/F4GN3R/repos")
      .then((response) => response.json())
      .then((data) => setRepos(data));
  }, []);

  const filteredRepos =
    search.length > 0
      ? repos.filter((repos) => repos.name.includes(search))
      : [];

  // useEffect(() => {
  //   if (search.length)
  //     setFilteredRepos(repos.filter((repos) => repos.name.includes(search)));
  // }, [search]);

  const filteredNumbers =
    list.length > 0 ? list.filter((number) => number > 2) : [];

  return (
    <div>
      <input
        type="text"
        name="search"
        placeholder="Buscar..."
        onChange={(event) => setSearch(event.target.value)}
        value={search}
      />

      {search.length > 0 ? (
        <ul>
          {filteredRepos.map((repo) => {
            return <li key={repo.name}>{repo.name}</li>;
          })}
        </ul>
      ) : (
        <ul>
          {repos.map((repo) => {
            return <li key={repo.name}>{repo.name}</li>;
          })}
        </ul>
      )}

      <span>{JSON.stringify(filteredNumbers)}</span>
    </div>
  );
}
