import { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import Caroucel from "../../components/caroucel/Caroucel";
import TitlePage from "../../components/titlePage/TitlePage";
import useCheckLogin from "../../customHook/useCheckLogin/useCheckLogin";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductApiAsync } from "../../apis/product/getAllProduct/getAllProduct.api";
import { getProductFavoriteApiAsync } from "../../apis/product/getProductfavorite/GetProductFavorite.api";
import { Pagination, Spin } from "antd";
import { setCleanProductFavorite } from "../../redux/reducel/productReducer";

const Home = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { checkUserLogin, isLogin } = useCheckLogin();
  const { products, productFavorite } = useSelector(
    (state) => state.productReducer
  );

  const getAllProductApi = async () => {
    const action = getAllProductApiAsync(currentPage, pageSize);
    dispatch(action);
  };

  const getProductFavorite = async () => {
    const action = getProductFavoriteApiAsync;
    dispatch(action);
  };

  const handleLoadingData = () => {
    checkUserLogin();
    getAllProductApi();

    const action = setCleanProductFavorite();
    dispatch(action);

    if (isLogin === true) {
      getProductFavorite();
    }
  };

  useEffect(() => {
    handleLoadingData();
  }, [isLogin, pageSize, currentPage]);

  return (
    <div className="w-full">
      <Caroucel />

      <div className="my-10">
        <TitlePage title="All Product" width="50%" />

        <div className="w-full flex flex-wrap gap-3 mt-5">
          {products && products.items && products.items.length > 0 ? (
            products.items.map((product, index) => (
              <Card
                key={index}
                product={product}
                productFavorite={productFavorite}
                handleLoadingData={handleLoadingData}
              />
            ))
          ) : (
            <Spin />
          )}
        </div>

        <Pagination
          current={products.pageIndex}
          defaultCurrent={1}
          total={products.totalRow}
          pageSize={products.pageSize}
          showSizeChanger={true}
          onShowSizeChange={(current, size) => {
            setPageSize(size);
            setCurrentPage(current);
          }}
          onChange={(page) => {
            setCurrentPage(page);
          }}
          align="end"
          className="py-5"
        />
      </div>
    </div>
  );
};

export default Home;
