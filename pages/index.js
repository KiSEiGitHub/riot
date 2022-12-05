import { useEffect, useState } from "react";

export default function Home() {
  const [champion, setChampion] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getchampion = async () => {
    const res = await fetch(
      "http://ddragon.leagueoflegends.com/cdn/12.22.1/data/en_US/champion.json"
    );
    const { data } = await res.json();
    const champions = Object.values(data);
    setChampion(champions);
    setIsLoading(false);
  };

  useEffect(() => {
    getchampion();
  }, []);

  return (
    <div className="main-container">
      <h1 className="title">Select your champion</h1>
      <div className="container-champion">
        {!isLoading &&
          champion.map((item, key) => (
            <div className="champions-cards" key={key}>
              {item.name}
            </div>
          ))}
      </div>
    </div>
  );
}
