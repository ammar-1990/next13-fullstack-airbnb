type Props = { title: string; description: string };

const Heading = ({ title, description }: Props) => {
  return (
    <div className="py-3 space-y-2">
      <h1 className="text-xl font-semibold">{title}</h1>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
};

export default Heading;
