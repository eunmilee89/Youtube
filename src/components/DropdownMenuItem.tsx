type Props = {
  icon?: React.ReactNode;
  text: string;
  subText?: string;
  onClick: () => void;
};

export default function DropdownMenuItem({
  icon,
  text,
  subText,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 w-full px-4 py-3 text-sm hover:bg-white/10 cursor-pointer"
    >
      {icon && <span className="text-lg">{icon}</span>}
      <div className="flex flex-col items-start">
        <div>{text}</div>
        <div className="text-zinc-400 text-xs">{subText}</div>
      </div>
    </button>
  );
}
