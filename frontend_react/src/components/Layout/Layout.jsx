import Navbar from "components/Navbar/Navbar";
import StickySocialMedia from "components/StickySocialMedia/StickySocialMedia";
import Footer from "container/Footer/Footer";
import AnimatedPage from "components/AnimatedPage/AnimatedPage";

const Layout = ({ children }) => (
    <div className="app">
      <AnimatedPage>
        <Navbar />
        <StickySocialMedia />
        <main className="app__content">{children}</main>
        <Footer />
      </AnimatedPage>
    </div>
);
export default Layout;