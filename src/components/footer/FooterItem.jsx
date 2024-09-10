const FooterItem = ({ item }) => {
  return (
    <ul>
      <li>
        <h1 className="uppercase font-bold">{item.title}</h1>
      </li>
      {item.items.map((item, index) => {
        return (
          <li key={index} className="text-[14px]">
            <a href="#">{item}</a>
          </li>
        );
      })}
    </ul>
  );
};

export default FooterItem;
