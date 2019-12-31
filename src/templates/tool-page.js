import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import { Link } from "gatsby";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing(1)
  },
  withoutLabel: {
    marginTop: theme.spacing(3)
  },
  textField: {
    width: 200
  },
  card: {
    padding: 16,
    height: "100%",
    marginRight: 16,
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "column"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
}));

export const ToolTemplate = ({
  name,
  category,
  status,
  automationLevel,
  description,
  longDescription
}) => {
  const classes = useStyles();

  return (
    <Container maxWidth="sm" style={{ paddingTop: 48 }}>
      <Typography variant="h4">{name}</Typography>
      <Typography variant="h5" className={classes.pos} color="textSecondary">
        {category}
      </Typography>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          paddingTop: 8
        }}
      >
        <Typography variant="caption" component="p" style={{ marginRight: 8 }}>
          status
        </Typography>
        <Rating name="read-only" value={status} readOnly size="small" />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          paddingBottom: 20
        }}
      >
        <Typography variant="caption" component="p" style={{ marginRight: 8 }}>
          automation level
        </Typography>
        <Rating
          name="read-only"
          value={automationLevel}
          readOnly
          size="small"
        />
      </div>

      <Typography variant="body">{longDescription || description}</Typography>
    </Container>
  );
};

const Tool = ({ data }) => {
  const { markdownRemark: tool } = data;

  return <ToolTemplate {...tool.frontmatter} />;
};

export default Tool;

export const pageQuery = graphql`
  query ToolByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        name
        description
        longDescription
        category
        status
        automationLevel
      }
    }
  }
`;
