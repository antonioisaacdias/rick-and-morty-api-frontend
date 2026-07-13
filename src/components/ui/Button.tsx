type ButtonProps = {
  name?: string;
  onClick?: () => void;
};

export default function Button({ name, onClick }: ButtonProps) {
  return (
    <button
      className="outline-none border-2 border-primary bg-primary text-black p-4 cursor-pointer hover:bg-alive"
      onClick={onClick}
    >
      {name ? name : "TEXT"}
    </button>
  );
}
