import { Header } from "../../components/Header";
import "./NotFoundPage.css";

export function NotFoundPage({ cart }) {
  return (
    <>
      <Header cart={cart} />
      <p className="not-found-message">404: Page Not Found</p>
    </>
  );
}
