// Layout wrapper to keep header and footer consistent
import Layout from "../../components/Layout/Layout";

// Scoped styles for this page
import styles from "./pageNotFound.module.css";

const PageNotFound = () => {
  return (
    <Layout>
      {/* Error message container */}
      <div className={styles.errorHolder}>
        <h2>404 – Page Not Found</h2>

        <p>
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
      </div>
    </Layout>
  );
};

export default PageNotFound;
