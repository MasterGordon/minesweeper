import type { ReactNode } from "react";
import { Switch } from "../../components/Switch";
import { useWSMutation, useWSQuery } from "../../hooks";

interface BoolSettingProps {
  label: string;
  description: ReactNode;
  value: boolean;
  onChange: (value: boolean) => void;
}

const BoolSetting: React.FC<BoolSettingProps> = ({
  label,
  description,
  value,
  onChange,
}) => (
  <div className="flex border-white/20 border-1 text-white/80 p-4 rounded-md justify-between items-end">
    <div className="flex gap-4 flex-col">
      <label className="text-white/90 text-lg">{label}</label>
      <p className="text-white/70 text-sm">{description}</p>
    </div>
    <Switch checked={value} onCheckedChange={onChange} />
  </div>
);

const Settings = () => {
  const { data: settings, refetch } = useWSQuery("user.getSettings", null);
  const updateSettings = useWSMutation("user.updateSettings");

  return (
    <div className="w-full">
      <div className="max-w-[650px] mx-auto flex flex-col gap-8">
        <h2 className="text-white/90 text-xl">Settings</h2>
        <div className="flex flex-col gap-4 ">
          <BoolSetting
            label="Place Question Mark"
            description={
              <>
                You can place a question mark on a tile after placing a flag.
                <br />
                Just right click again on the tile.
              </>
            }
            value={settings?.placeQuestionMark ?? false}
            onChange={async (value) => {
              await updateSettings.mutateAsync({ placeQuestionMark: value });
              refetch();
            }}
          />
          <BoolSetting
            label="Long Press On Desktop"
            description={
              <>
                You can long press on a tile to reveal it. This is useful for
                touch devices.
              </>
            }
            value={settings?.longPressOnDesktop ?? false}
            onChange={async (value) => {
              await updateSettings.mutateAsync({ longPressOnDesktop: value });
              refetch();
            }}
          />
          <BoolSetting
            label="Show Reveal Animation"
            description={<>Show an animation when a tile is revealed.</>}
            value={settings?.showRevealAnimation ?? true}
            onChange={async (value) => {
              await updateSettings.mutateAsync({ showRevealAnimation: value });
              refetch();
            }}
          />
          <BoolSetting
            label="Sound Effects"
            description={<>Enable or disable sound effects in the game.</>}
            value={settings?.soundEnabled ?? true}
            onChange={async (value) => {
              await updateSettings.mutateAsync({ soundEnabled: value });
              refetch();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
