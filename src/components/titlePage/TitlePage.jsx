const TitlePage = ({ width, title }) => {
  return (
    <div
      className={`bg-gradient-to-b from-[#F21299] to-[#1B02B5] py-2 px-4 text-white w-[${width}] font-medium`}
    >
      <h1>{title}</h1>
    </div>
  );
};

export default TitlePage;
