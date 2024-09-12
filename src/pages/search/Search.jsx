import { ClearOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Empty, Flex, Form, Input, Select } from "antd";
import TitlePage from "../../components/titlePage/TitlePage";
import { useSearchParams } from "react-router-dom";
import { searchApiAsync } from "../../apis/product/search/search.api";
import Card from "../../components/card/Card";
import { useEffect, useState } from "react";
import useLoadingData from "../../customHook/useLoadingData/useLoadingData";
import _ from "lodash";
import { useSelector } from "react-redux";
import { useWindowSize } from "@uidotdev/usehooks";

const Search = () => {
  const size = useWindowSize();
  const [sortProduct, setSortProduct] = useState([]);
  const [sortOption, setSortOption] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const { handleLoadingData } = useLoadingData();
  const { productFavorite } = useSelector((state) => state.productReducer);

  const searchValue = searchParams.get("search");

  const handleSortOption = (value) => {
    setSortOption(value);
  };

  const handleSubmitSearch = async () => {
    const res = await searchApiAsync(searchValue);

    if (
      res.statusCode === 200 &&
      res?.content.length > 0 &&
      searchValue.trim().length > 0
    ) {
      switch (sortOption) {
        case 1:
          const sortedAsc = _.orderBy(res.content, ["price"], ["asc"]);
          setSortProduct(sortedAsc);
          break;
        case 2:
          const sortedDesc = _.orderBy(res.content, ["price"], ["desc"]);
          setSortProduct(sortedDesc);
          break;
        default:
          setSortProduct(res.content);
          break;
      }
    } else {
      setSortProduct([]);
    }
  };

  useEffect(() => {
    handleLoadingData();
    handleSubmitSearch();
  }, [searchValue, sortOption]);

  return (
    <div className="w-full">
      <Form
        layout="vertical"
        className={`${size.width <= 600 ? "w-[100%]" : "w-[50%]"}`}
      >
        <Form.Item label="Search" className="font-bold">
          <Flex>
            <Input
              size="large"
              className="rounded-e-none font-normal"
              prefix={<SearchOutlined />}
              placeholder="Enter search value"
              value={searchValue}
              onChange={(e) => {
                setSearchParams({ search: e.target.value });
                handleSubmitSearch();
              }}
            />
            <Button
              onClick={() => {
                setSearchParams({ search: "" });
              }}
              size="large"
              type="primary"
              className="rounded-s-none"
            >
              <ClearOutlined />
            </Button>
          </Flex>
        </Form.Item>
      </Form>
      <TitlePage title="Search result" />

      <Select
        className="mt-4"
        defaultValue={0}
        style={{ width: 150 }}
        onChange={(value) => handleSortOption(value)}
        options={[
          { value: 0, label: "Sắp xếp theo" },
          { value: 1, label: "Giá tăng dần" },
          { value: 2, label: "Giá giảm dần" },
        ]}
      />

      <div className="flex flex-wrap gap-3 py-5">
        {sortProduct && sortProduct.length > 0 ? (
          sortProduct?.map((product, index) => (
            <Card
              product={product}
              key={index}
              handleLoadingData={handleLoadingData}
              productFavorite={productFavorite}
            />
          ))
        ) : (
          <Empty className="w-full" image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </div>
    </div>
  );
};

export default Search;
