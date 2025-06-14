import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect } from "react";
import { useWSQuery } from "../../hooks";
import { Tag } from "../../components/Tag";
import RegisterButton from "../../components/Auth/RegisterButton";
import { Button } from "../../components/Button";
import defusing from "../../assets/illustrations/defusing.png?aspect=4:3&w=100;200;300;400&format=webp&quality=100&as=metadata";
import lootbox1 from "../../assets/illustrations/lootbox1.png?aspect=1:1&w=100;200;300;400&format=webp&quality=100&as=metadata";
import mine from "../../assets/illustrations/mine.png?aspect=1:1&w=100;200;300;400&format=webp&quality=100&as=metadata";
import Section from "./Section";
import Hr from "../../components/Hr";
import { Link } from "wouter";

const Home = () => {
  const { data: userCount } = useWSQuery("user.getUserCount", null);
  const { data: gameCount } = useWSQuery("game.getTotalGamesPlayed", {});
  const { data: username } = useWSQuery("user.getSelf", null);
  const usersFrom = (userCount ?? 0) / 2;
  const usersTo = userCount ?? 0;
  const gamesFrom = (gameCount ?? 0) / 2;
  const gamesTo = gameCount ?? 0;

  const usersCount = useMotionValue(usersFrom);
  const roundedUsers = useTransform(usersCount, (latest) => Math.round(latest));
  const gamesCount = useMotionValue(gamesFrom);
  const roundedGames = useTransform(gamesCount, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(usersCount, usersTo, { duration: 1.5 });
    return controls.stop;
  }, [usersCount, usersTo]);
  useEffect(() => {
    const controls = animate(gamesCount, gamesTo, { duration: 1.5 });
    return controls.stop;
  }, [gamesCount, gamesTo]);

  return (
    <div className="flex flex-col gap-8 mb-32">
      <div className="flex flex-col gap-8 items-center py-48">
        <Tag variant="outline2">
          <motion.span>{roundedUsers}</motion.span> Users Played{" "}
          <motion.span>{roundedGames}</motion.span> Games
        </Tag>
        <h1 className="text-white/80 font-black font-mono text-3xl md:text-6xl text-center">
          Business Minesweeper
          <br />
          <span className="[background:var(--bg-brand)] [-webkit-text-fill-color:transparent] font-black [-webkit-background-clip:text!important] font-mono text-xl md:text-4xl text-center">
            is the greatest experience
          </span>
        </h1>
        <span className="flex gap-8 items-center">
          <h2 className="text-white/80 font-black font-mono text-xl text-center">
            Start now
          </h2>
          {username ? (
            // @ts-expect-error We dont care since this is internal api
            <Button variant="primary" as={Link} href="/play">
              Play
            </Button>
          ) : (
            <RegisterButton />
          )}
        </span>
      </div>
      <Section
        text="Be the one to find the mines and win the game. Score the highest stage and put yourself in the leaderboard."
        image={defusing}
      />
      <Hr />
      <Section
        text="Add friends to watch the game and play with them. You can also challenge your friends to a game and see who can go further in a limited ammount of time."
        image={mine}
        left
      />
      <Hr />
      <Section
        text="Win games to collect gems so you can get loot to customize your board. Improve your score and your own game experience."
        image={lootbox1}
      />
    </div>
  );
};

export default Home;
