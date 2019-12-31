import React from "react";
import PropTypes from "prop-types";
import { ToolTemplate } from "../../templates/tool-page";

const ToolPreview = ({ entry, widgetFor }) => (
  <ToolTemplate
    category={entry.getIn(["data", "category"])}
    status={entry.getIn(["data", "status"])}
    automationLevel={entry.getIn(["data", "automationLevel"])}
    description={entry.getIn(["data", "description"])}
    longDescription={entry.getIn(["data", "longDescription"])}
    name={entry.getIn(["data", "name"])}
  />
);

// ToolPreview.propTypes = {
//   entry: PropTypes.shape({
//     getIn: PropTypes.func,
//   }),
//   widgetFor: PropTypes.func,
// };

export default ToolPreview;
