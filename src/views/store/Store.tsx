import { Fragment } from "react/jsx-runtime";
import { lootboxes } from "../../../shared/lootboxes";
import { Button } from "../../components/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/Dialog";
import GemsIcon from "../../components/GemIcon";
import { themes } from "../../themes";
import { useWSMutation, useWSQuery } from "../../hooks";
import { Rarity } from "../../components/Rarity";
import { lootboxResultAtom } from "../../atoms";
import { useAtom } from "jotai";
import { useEffect } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { loadSeaAnemonePreset } from "@tsparticles/preset-sea-anemone";
import { motion } from "framer-motion";
import BounceImg from "../../components/BounceImg";

const Store = () => {
  const openLootbox = useWSMutation("user.openLootbox");
  const [lootboxResult, setLootboxResult] = useAtom(lootboxResultAtom);
  const currentLootbox = lootboxes.find((l) => l.id === lootboxResult?.lootbox);
  const { refetch } = useWSQuery("user.getOwnGems", null);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      await loadSeaAnemonePreset(engine);

      //await loadBasic(engine);
    });
  }, []);

  return (
    <>
      <Dialog
        open={!!currentLootbox}
        onOpenChange={() => setLootboxResult(undefined)}
      >
        <DialogContent className="relative h-96 w-[1000px]">
          <DialogHeader>
            <DialogTitle className="z-10">
              Opening {currentLootbox?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="absolute flex h-full w-full flex-col items-center justify-center">
            <Particles
              className="rounded-md"
              id="tsparticles"
              options={{
                id: "tsparticles",
                preset: "seaAnemone",
              }}
            />
            <motion.div
              className="text-white/90 text-6xl"
              initial={{ scale: 0, rotate: 0, opacity: 0 }}
              animate={{
                scale: [0, 0.2, 0.5, 0.75, 1.5, 1.2, 1],
                rotate: 360 * 2,
                opacity: 1,
              }}
              transition={{ type: "spring", duration: 5 }}
            >
              <Rarity
                // @ts-expect-error Don't care
                rarity={
                  currentLootbox?.items.find(
                    (i) => i.id == lootboxResult?.result,
                  )?.rarity
                }
              >
                {themes.find((t) => t.id === lootboxResult?.result)?.name}
              </Rarity>
            </motion.div>
          </div>
        </DialogContent>
      </Dialog>
      <div className="flex flex-col gap-4 w-full">
        <h2 className="text-white/90 text-xl">Store</h2>
        <div className="flex flex-row gap-y-6 gap-x-8 items-center w-full flex-wrap justify-center mb-10">
          <div className="flex flex-row gap-y-6 gap-x-8 items-center w-full flex-wrap justify-center mb-10">
            {lootboxes.map((lootbox) => (
              <div
                key={lootbox.id}
                className="border-white/10 border-1 rounded-md p-4"
              >
                <div className="flex gap-4 justify-between">
                  <h3 className="text-white/90 text-lg">{lootbox.name}</h3>
                  <Dialog>
                    <DialogTrigger>
                      <Button variant="default" size="sm">
                        Preview
                      </Button>
                    </DialogTrigger>
                    <DialogContent
                      className="max-w-4xl m-4 relative top-4 translate-y-0"
                      overlayClassName="overflow-y-auto"
                    >
                      <DialogHeader>
                        <DialogTitle>{lootbox.name}</DialogTitle>
                      </DialogHeader>
                      <div className="flex gap-4 flex-wrap flex-row">
                        <div className="flex flex-col gap-4 basis-md">
                          <BounceImg
                            src={lootbox.image}
                            className="max-w-[360px] w-[min(360px,100%)]"
                          />
                          <div className="text-white/70 text-base">
                            Introducing <i>{lootbox.name}</i>, the first-ever
                            lootbox for Minesweeper, packed with a variety of
                            stylish skins to customize your game like never
                            before! With <i>{lootbox.name}</i>, every click
                            becomes a statement, as you explore new looks for
                            your mines, tiles, and flags. Transform your
                            Minesweeper grid with these visually captivating
                            designs and make each puzzle feel fresh and
                            exciting.
                          </div>
                          <h3 className="text-white/90 text-lg">
                            What&apos;s Inside?
                          </h3>
                          <ul className="text-white/70 text-base flex flex-col gap-2">
                            <li>
                              <b>Mine Skins:</b> Swap out the classic mine icons
                              for creative alternatives like skulls, treasure
                              chests, or high-tech drones.
                            </li>
                            <li>
                              <b>Tile Skins:</b> Replace the plain tiles with
                              vibrant patterns such as tropical beaches,
                              medieval bricks, or sleek metallic plates.
                            </li>
                            <li>
                              <b>Flag Skins:</b> Mark suspected mines in style
                              with custom flag designs including pirate flags,
                              futuristic beacons, or glowing crystals.
                            </li>
                            <li>
                              <b>Backgrounds:</b> Enhance your gameplay
                              experience with unique backgrounds, from serene
                              mountain landscapes to bustling cityscapes or
                              outer space vistas.
                            </li>
                            <div className="text-white/70 text-base">
                              Step up your Minesweeper game and express your
                              personality with <i>{lootbox.name}</i>. Unlock new
                              looks and turn every game into a visual
                              masterpiece!
                            </div>
                          </ul>
                        </div>
                        <div className="flex justify-center grow">
                          <div className="grid grid-cols-2 gap-4">
                            <div>Skin</div>
                            <div>Rarity</div>
                            {lootbox.items.map((item) => (
                              <Fragment key={item.id}>
                                <div className="text-white/90">
                                  {themes.find((t) => t.id === item.id)?.name}
                                </div>
                                <Rarity rarity={item.rarity} />
                              </Fragment>
                            ))}
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <BounceImg src={lootbox.image} className="w-[360px]" />
                <Button
                  variant="outline"
                  size="default"
                  className="mx-auto items-center"
                  onClick={() => {
                    openLootbox
                      .mutateAsync({ id: lootbox.id })
                      .then(() => refetch());
                  }}
                >
                  Buy for <b>{lootbox.priceText}</b> <GemsIcon />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Store;
