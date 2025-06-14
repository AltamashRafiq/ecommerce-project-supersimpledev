import { Header } from "../../components/Header";
import "./NotFoundPage.css";

export function NotFoundPage() {
  return (
    <>
      <Header />
      <p className="not-found-message">404: Page Not Found</p>
    </>
  );
}
