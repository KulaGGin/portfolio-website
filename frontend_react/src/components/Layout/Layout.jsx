import Navbar from "components/Navbar/Navbar";
import StickySocialMedia from "components/StickySocialMedia/StickySocialMedia";
import Footer from "container/Footer/Footer";

const Layout = ({ children }) => (
    <div className="app">
      <Navbar />
      <StickySocialMedia />
      <main className="app__content">{children}</main>
      <Footer />
    </div>
);
export default Layout;