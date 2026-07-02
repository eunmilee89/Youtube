interface Props {
  icon?: React.ReactNode;
  text?: string;
  onClick: () => void;
  style?: string;
  iconSize?: string;
  textSize?: string;
  disabled?: boolean;
}

export default function FeedBackBtn({
  icon,
  text,
  onClick,
  style,
  iconSize,
  textSize,
  disabled,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-4 h-9 font-semibold rounded-full hover:bg-zinc-100/20 cursor-pointer disabled:hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed
      } ${style ?? "bg-zinc-800"}`}
      disabled={disabled}
    >
      {icon && <span className={`${iconSize || "text-xl"}`}>{icon}</span>}
      {text && (
        <span className={`${textSize ? textSize : "text-[14px]"}`}>{text}</span>
      )}
    </button>
  );
}
