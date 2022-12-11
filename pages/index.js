import { Image, useMediaQuery, Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ModalLore from "../components/ModalLore";

export default function Home() {
  const [champion, setChampion] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mediaTrigger] = useMediaQuery("(max-width: 680px)");

  const getchampion = async () => {
    const res = await fetch(
      "https://ddragon.leagueoflegends.com/cdn/12.22.1/data/en_US/champion.json"
    );

    const { data } = await res.json();
    const champ = Object.values(data); // tableau

    champ.forEach(async (champion) => {
      // fetch chaque champion
      const res = await fetch(
        `https://ddragon.leagueoflegends.com/cdn/12.23.1/data/en_US/champion/${champion.name}.json`
      );
      const { data } = await res.json();

      // fetch summonners
      const resSumms = await fetch(
        "https://ddragon.leagueoflegends.com/cdn/12.23.1/data/en_US/summoner.json"
      );
      const dataSums = await resSumms.json();
      const summoners = Object.values(dataSums.data);
      let tabSums = [];

      for (let i = 0; i < summoners.length; i++) {
        tabSums.push({
          id: i,
          name: summoners[i].name,
          description: summoners[i].description,
          img: `https://ddragon.leagueoflegends.com/cdn/12.23.1/img/spell/${summoners[i].id}.png`,
        });
      }

      const spellsTab = [];

      // add passive
      const champPassive = Object.values(data)[0].passive;
      spellsTab.push({
        name: champPassive.name,
        description: champPassive.description,
        image: `https://ddragon.leagueoflegends.com/cdn/12.23.1/img/passive/${champPassive.image.full}`,
        keyboard: "passive",
      });

      // fetch spells
      const spells = Object.values(data)[0].spells;
      for (let i = 0; i < spells.length; i++) {
        spellsTab.push({
          id: spells[i].id,
          imageName: spells[i].image.full,
          description: spells[i].description,
          name: spells[i].name,
          image: `https://ddragon.leagueoflegends.com/cdn/12.23.1/img/spell/${spells[i].image.full}`,
        });
      }

      // fetch allytips
      const tabTipsAlly = Object.values(data);
      const tabAlly = [];
      tabTipsAlly.forEach((ally) => {
        tabAlly.push(ally.allytips[0]);
        tabAlly.push(ally.allytips[1]);
        tabAlly.push(ally.allytips[2]);
      });

      // fetch ennemytips
      const tabTipsEnn = Object.values(data);
      const tabEnn = [];
      tabTipsEnn.forEach((enn) => {
        tabEnn.push(enn.enemytips[0]);
        tabEnn.push(enn.enemytips[1]);
        tabEnn.push(enn.enemytips[2]);
      });

      // fetch skins
      const skins = Object.values(data);
      const allChampSkins = skins[0].skins;
      const skinsTab = [];
      allChampSkins.forEach((skin) => {
        skinsTab.push(skin);
      });

      setChampion((curr) => [
        ...curr,
        {
          skins: skinsTab,
          name: champion.name,
          tags: champion.tags,
          title: champion.title,
          sqaureIcon: `https://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${champion.name}.png`,
          splash: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.name}_0.jpg`,
          loading: `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.name}_0.jpg`,
          lore: data[champion.name]["lore"],
          spells: spellsTab,
          sums: tabSums,
          allytips: tabAlly,
          enemytips: tabEnn,
        },
      ]);

      setIsLoading(false);
    });
  };

  useEffect(() => {
    getchampion();
  }, []);

  console.log(champion);

  return (
    <div className="main-container">
      <h1 className="title">Select your champion</h1>
      <div className="container-champion">
        {!isLoading &&
          champion.map((item, key) => (
            <Box
              className="champions-cards"
              key={key}
              w={["auto", "auto", "300px"]}
              h={["auto", "auto", "auto"]}
              pos="relative"
            >
              <ModalLore
                lore={item.lore}
                name={item.name}
                wallpaper={item.splash}
                spells={item.spells}
                sums={item.sums}
                tags={item.tags}
                title={item.title}
                ally={item.allytips}
                enemy={item.enemytips}
                skins={item.skins}
              />
              {mediaTrigger ? (
                <Image
                  src={item.sqaureIcon}
                  alt="ok"
                  width="60px"
                  height="auto"
                  borderTopRadius="10px"
                  pos="relative"
                />
              ) : (
                <>
                  <Image
                    src={item.loading}
                    alt="ok"
                    width="100%"
                    height="auto"
                    borderTopRadius="10px"
                    pos="relative"
                  />
                  <Text
                    pos="absolute"
                    backdropFilter="blur(10px)"
                    bottom={5}
                    left="50%"
                    fontSize="1.2em"
                    transform="translate(-50%, -50%)"
                    borderRadius={8}
                    p="5px 10px"
                  >
                    {item.name}
                  </Text>
                </>
              )}
            </Box>
          ))}
      </div>
    </div>
  );
}
