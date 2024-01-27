import useIntersect from "@pages/products/hooks/useIntersect";
import * as S from "../../styles/style";
import KakaoMap from "../KakaoMap";
import ProductCard from "../ProductCard";
import useProducts from "@pages/products/api/queries";
import { useMapState } from "@pages/products/stores/mapStore";
import { ScrollRestoration, useSearchParams } from "react-router-dom";
import { Category, Option, OrderState } from "@pages/products/api/products";
import { useEffect } from "react";
import NoProduct from "../NoProduct";
import LoadingCircle from "@components/loading";

const ProductList = () => {
  const [searchParams] = useSearchParams();

  const options = searchParams.getAll("options");
  const order = searchParams.get("order");
  const category = searchParams.get("category");
  const keyword = searchParams.get("keyword");
  const checkInDate = searchParams.get("checkInDate");
  const checkOutDate = searchParams.get("checkOutDate");

  const {
    data: products,
    hasNextPage,
    isLoading,
    isFetching,
    fetchNextPage
  } = useProducts({
    ...(options && { options: options as Option[] }),
    ...(order && { order: order as OrderState }),
    ...(category && { category: category as Category }),
    ...(checkInDate && { checkInDate: checkInDate }),
    ...(checkOutDate && { checkOutDate: checkOutDate }),
    ...(keyword && { keyword: keyword }),
    size: 10
  });
  const { isMapOpen, setHasProducts, hasProducts } = useMapState();

  useEffect(() => {
    setHasProducts(products.length);
  }, [products.length, setHasProducts]);

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching && products.length > 0) {
      console.log("fetch next page");
      fetchNextPage();
    }
  });

  if (isLoading) return <LoadingCircle />;

  return (
    <>
      {isMapOpen ? (
        <S.MapContainer>
          <KakaoMap products={products} />
        </S.MapContainer>
      ) : !hasProducts ? (
        <NoProduct />
      ) : (
        <>
          <ScrollRestoration />
          <S.ProductCardWrapper>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            <div className="observer" ref={ref} />
          </S.ProductCardWrapper>
        </>
      )}
    </>
  );
};

export default ProductList;
