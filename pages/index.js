import { Box, Button, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Home() {
  const [champion, setChampion] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [shortDescReveal, setShortDescReveal] = useState(false);

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

  console.log(champion);

  return (
    <div className="main-container">
      <h1 className="title">Select your champion</h1>
      <div className="container-champion">
        {!isLoading &&
          champion.map((item, key) => (
            <div className="champions-cards" key={key}>
              <Box pos="absolute" display={shortDescReveal ? "block" : "none"}>
                <h1>Hello</h1>
              </Box>
              <Image
                src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${item.name}_0.jpg`}
                alt="ok"
                width="100%"
                height="280px"
                objectFit="cover"
                borderTopRadius="10px"
                onMouseEnter={() => setShortDescReveal(true)}
                onMouseLeave={() => setShortDescReveal(false)}
              />
              <div className="champion-description">
                <h2 className="champion-name">{item.name}</h2>
                <h3 className="champion-title">{item.title}</h3>
                {item.tags.map((el, key) => (
                  <span className="chamption-tags" key={key}>
                    {el}
                  </span>
                ))}
                <Button
                  mt={4}
                  display="block"
                  colorScheme="orange"
                  variant="outline"
                >
                  Lore
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
