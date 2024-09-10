import FooterItem from "./FooterItem";

const footerItem = [
  {
    key: "1",
    title: "Get help",
    items: ["Home", "Nike", "Adidas", "Contact"],
  },
  {
    key: "2",
    title: "Support",
    items: ["About", "Contact", "Help", "Phone"],
  },
  {
    key: "3",
    title: "Resgister",
    items: ["Resgister", "Login"],
  },
];

const Footer = () => {
  return (
    <>
      <div className="max-w-[1024px] mx-auto px-2">
        <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row justify-around py-4">
          {footerItem.map((item) => {
            return (
              <div
                className={`w-full text-center sm:text-start sm:w-[calc(100%/3)] sm:ps-10 ${
                  item.key === "2" && "sm:border-x-2"
                }`}
                key={item.key}
              >
                <FooterItem item={item} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full bg-[#D9D9D9] text-center py-3">
        © 2022 Cybersoft All Rights Reserved | Design Theme by Trương Tấn Khải.
      </div>
    </>
  );
};

export default Footer;
