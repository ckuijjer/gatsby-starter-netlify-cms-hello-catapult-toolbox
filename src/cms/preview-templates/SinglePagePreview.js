import React from "react";
import PropTypes from "prop-types";
import { SinglePageTemplate } from "../../templates/single-page";

const SinglePagePreview = ({ entry, widgetFor }) => (
  <SinglePageTemplate
    content={widgetFor("body")}
    title={entry.getIn(["data", "title"])}
  />
);

export default SinglePagePreview;
