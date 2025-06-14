import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { useParams, Link } from "react-router";
import dayjs from "dayjs";
import "./TrackingPage.css";

export function TrackingPage({ cart }) {
  const { orderId, productId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const response = await axios.get(
        `/api/orders/${orderId}?expand=products`
      );
      setOrder(response.data);
    };

    fetchOrderDetails();
  }, [orderId]);

  if (!order) {
    return null;
  }

  const productDetails = order.products.find(
    (product) => product.productId === productId
  );

  return (
    <>
      <title>Tracking</title>
      <link rel="icon" type="image/svg+xml" href="/tracking-favicon.png" />

      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            Arriving on{" "}
            {dayjs(productDetails.estimatedDeliveryTimeMs).format(
              "dddd, MMMM D"
            )}
          </div>

          <div className="product-info">{productDetails.product.name}</div>

          <div className="product-info">
            Quantity: {productDetails.quantity}
          </div>

          <img className="product-image" src={productDetails.product.image} />

          <div className="progress-labels-container">
            <div className="progress-label">Preparing</div>
            <div className="progress-label current-status">Shipped</div>
            <div className="progress-label">Delivered</div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar"></div>
          </div>
        </div>
      </div>
    </>
  );
}
