interface Props {
  icon?: React.ReactNode;
  text?: string;
  onClick: () => void;
  style?: string;
  iconSize?: string;
  textSize?: string;
}

export default function FeedBackBtn({
  icon,
  text,
  onClick,
  style,
  iconSize,
  textSize,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-4 h-9 font-semibold rounded-full hover:bg-zinc-100/20 cursor-pointer ${style ?? "bg-zinc-800"}`}
    >
      {icon && <span className={`${iconSize || "text-xl"}`}>{icon}</span>}
      {text && (
        <span className={`${textSize ? textSize : "text-[14px]"}`}>{text}</span>
      )}
    </button>
  );
}
