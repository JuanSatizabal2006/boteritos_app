export const Header = ({ title }) => {
  return (
    <>
      <header className="w-full h-[100px] bg-white flex items-center px-8 font-cocogooseSemiLight text-subTitle text-darkBlue">
        {title}
      </header>
    </>
  );
};
