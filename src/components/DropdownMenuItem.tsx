type Props = {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
};

export default function DropdownMenuItem({ icon, text, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 w-full px-4 py-3 text-sm hover:bg-white/10 cursor-pointer"
    >
      <span className="text-lg">{icon}</span>
      {text}
    </button>
  );
}
