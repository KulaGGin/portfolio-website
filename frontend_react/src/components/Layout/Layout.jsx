import Navbar from "components/Navbar/Navbar";
import StickySocialMedia from "components/StickySocialMedia/StickySocialMedia";
import Footer from "container/Footer/Footer";
import AnimatedPage from "components/AnimatedPage/AnimatedPage";

const Layout = ({ children }) => (
    <div className="app">
        <Navbar />
        <main className="app__content">{children}</main>
        <Footer />
    </div>
);
export default Layout;