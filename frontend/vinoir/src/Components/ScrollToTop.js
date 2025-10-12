import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll instantly to top-left whenever the pathname changes
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // You can change to "smooth" if preferred, but may cause jank
    });
  }, [pathname]);

  return null; // This component doesn’t render any visible content
}
