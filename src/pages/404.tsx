import * as React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";

const NotFoundPage = () => {
  return (
    <Layout pageTitle="Page Not Found">
      <p>
        Sorry{" "}
        <span role="img" aria-label="Pensive emoji">
          😔
        </span>{" "}
        we couldn’t find what you were looking for.
      </p>
      <Link to="/">Go home</Link>
    </Layout>
  );
};

export default NotFoundPage;
