type Props = { title: string; description: string,center?:boolean };

const Heading = ({ title, description,center=false }: Props) => {
  return (
    <div className="py-3 space-y-2">
      <h1 className={`text-xl font-semibold ${center && 'text-center'}`}>{title}</h1>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
};

export default Heading;
