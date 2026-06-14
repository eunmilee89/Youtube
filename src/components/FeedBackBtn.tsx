interface Props {
  icon?: React.ReactNode;
  text?: string;
  onClick: () => void;
  style?: string;
}

export default function FeedBackBtn({ icon, text, onClick, style }: Props) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-1 bg-zinc-800 text-[14px] font-semibold rounded-full px-4 h-9 hover:bg-zinc-100/20 ${style}`}
    >
      {icon && <span className="text-2xl">{icon}</span>}
      {text}
    </button>
  );
}
