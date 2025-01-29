import logo from "../assets/logo.png";

export const Header = () => {
  return (
    <div className="flex py-4">
      <div className="flex flex-col">
        <img src={logo} className="w-8" />
      </div>
      <h1 className="text-2xl text-white">Albion Trading</h1>
    </div>
  );
};
