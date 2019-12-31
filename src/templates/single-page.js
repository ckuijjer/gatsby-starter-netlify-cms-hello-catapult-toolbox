import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import Container from "@material-ui/core/Container";
import Content, { HTMLContent } from "../components/Content";
import rehypeReact from "rehype-react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const colors = {
  primary: "#FD008B"
};

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: 120
  },
  link: {}
}));

const H1 = withStyles({
  body1: {}
})(({ children, ...rest }) => (
  <Typography variant="h3" component="h1" gutterBottom {...rest}>
    {children}
  </Typography>
));

const H2 = withStyles({
  body1: {}
})(({ children, ...rest }) => (
  <Typography variant="h4" component="h2" gutterBottom {...rest}>
    {children}
  </Typography>
));

const H3 = withStyles({
  body1: {}
})(({ children, ...rest }) => (
  <Typography variant="h5" component="h3" gutterBottom {...rest}>
    {children}
  </Typography>
));

const Li = withStyles({
  body1: {}
})(({ children, ...rest }) => (
  <li style={{ "list-style-type": "initial", marginLeft: 16 }}>
    <Typography variant="body1" {...rest} paragraph>
      {children}
    </Typography>
  </li>
));

const CustomLink = withStyles({
  link: {
    color: colors.primary
  },
  text: {
    display: "inline",
    color: colors.primary
  }
})(({ children, classes, href = "", ...rest }) => {
  // Detect local links in a super simple way, if so use Link otherwise use an A element with a target="_blank"
  const isLocalLink = href.substring(0, 1) === "/";

  if (isLocalLink) {
    return (
      <Link className={classes.link} to={href} {...rest}>
        <Typography variant="body1" component="span" className={classes.text}>
          {children}
        </Typography>
      </Link>
    );
  } else {
    return (
      <a
        className={classes.link}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        <Typography variant="body1" component="span" className={classes.text}>
          {children}
        </Typography>
      </a>
    );
  }
});

const Paragraph = withStyles({
  body1: {
    marginBottom: 24
  }
})(({ children, ...rest }) => (
  <Typography variant="body1" {...rest}>
    {children}
  </Typography>
));

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    h1: H1,
    h2: H2,
    h3: H3,
    p: Paragraph,
    li: Li,
    a: CustomLink
  }
}).Compiler;

const RehypeContent = ({ content }) => {
  return <>{renderAst(content)}</>;
};

export const SinglePageTemplate = ({ content, contentComponent, title }) => {
  const PostContent = contentComponent || Content;

  return (
    <Container maxWidth="sm" style={{ paddingTop: 48 }}>
      <PostContent content={content} />
    </Container>
  );
};

const SinglePage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <SinglePageTemplate
      content={post.htmlAst}
      contentComponent={RehypeContent}
      title={post.frontmatter.name}
    />
  );
};

export default SinglePage;

export const pageQuery = graphql`
  query SinglePageByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      htmlAst
      frontmatter {
        title
      }
    }
  }
`;
