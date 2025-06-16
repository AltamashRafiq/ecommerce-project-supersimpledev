import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { ProductsGrid } from "./ProductsGrid";
import { useSearchParams } from "react-router";
import "./HomePage.css";

export function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  useEffect(() => {
    const getHomeData = async () => {
      const path = search ? `/api/products?search=${search}` : "/api/products";
      const response = await axios.get(path);
      setProducts(response.data);
    };

    getHomeData();
  }, [search]);

  return (
    <>
      <title>Ecommerce Project</title>
      <link rel="icon" type="image/png" href="/home-favicon.png" />

      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}
