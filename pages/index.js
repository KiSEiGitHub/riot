import { Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ModalLore from "../components/ModalLore";

export default function Home() {
  const [champion, setChampion] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getchampion = async () => {
    const res = await fetch(
      "http://ddragon.leagueoflegends.com/cdn/12.22.1/data/en_US/champion.json"
    );

    const { data } = await res.json();
    // console.log(data);
    const champ = Object.values(data); // tableau

    champ.forEach(async (champion) => {
      // fetch chaque champion
      const res = await fetch(
        `http://ddragon.leagueoflegends.com/cdn/12.23.1/data/en_US/champion/${champion.name}.json`
      );
      const { data } = await res.json();

      // fetch summonners
      const resSumms = await fetch(
        "http://ddragon.leagueoflegends.com/cdn/12.23.1/data/en_US/summoner.json"
      );
      const dataSums = await resSumms.json();
      const summoners = Object.values(dataSums.data);

        
      setChampion((curr) => [
        ...curr,
        {
          name: champion.name,
          tags: champion.tags,
          title: champion.title,
          splash: `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.name}_0.jpg`,
          loading: `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.name}_0.jpg`,
          lore: data[champion.name]["lore"],
          spells: [
            {
              id: 1,
              spell: `https://ddragon.leagueoflegends.com/cdn/12.23.1/img/spell/${champion.name}Q.png`,
              description: data[champion.name]["spells"][0]["description"],
              name: data[champion.name]["spells"][0]["name"],
              keyboard: "Q",
            },
            {
              id: 2,
              spell: `https://ddragon.leagueoflegends.com/cdn/12.23.1/img/spell/${champion.name}W.png`,
              description: data[champion.name]["spells"][1]["description"],
              name: data[champion.name]["spells"][1]["name"],
              keyboard: "W",
            },
            {
              id: 3,
              spell: `https://ddragon.leagueoflegends.com/cdn/12.23.1/img/spell/${champion.name}E.png`,
              description: data[champion.name]["spells"][2]["description"],
              name: data[champion.name]["spells"][2]["name"],
              keyboard: "E",
            },
            {
              id: 4,
              spell: `https://ddragon.leagueoflegends.com/cdn/12.23.1/img/spell/${champion.name}R.png`,
              description: data[champion.name]["spells"][3]["description"],
              name: data[champion.name]["spells"][3]["name"],
              keyboard: "R",
            },
          ],
          sums: summoners,
        },
      ]);

      setIsLoading(false);
    });
  };

  useEffect(() => {
    getchampion();
  }, []);

  //   console.log(champion);

  return (
    <div className="main-container">
      <h1 className="title">Select your champion</h1>
      <div className="container-champion">
        {!isLoading &&
          champion.map((item, key) => (
            <div className="champions-cards" key={key}>
              <ModalLore
                lore={item.lore}
                name={item.name}
                wallpaper={item.splash}
                spells={item.spells}
                sums={item.sums}
                tags={item.tags}
                title={item.title}
              />
              <Image
                src={item.loading}
                alt="ok"
                width="100%"
                height="auto"
                borderTopRadius="10px"
              />
            </div>
          ))}
      </div>
    </div>
  );
}
