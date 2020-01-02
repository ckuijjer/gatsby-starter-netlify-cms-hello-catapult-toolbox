import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MuiLink from "@material-ui/core/Link";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import { Link, graphql } from "gatsby";
import Case from "case";

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

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <MuiLink color="inherit" href="https://material-ui.com/">
        NN Catapult
      </MuiLink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const SearchBox = ({ value, onChange }) => {
  const classes = useStyles();
  return (
    <FormControl fullWidth className={classes.margin} variant="outlined">
      <OutlinedInput
        id="outlined-adornment-amount"
        value={value}
        onChange={onChange}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

const ToolboxEntry = ({ data }) => {
  const classes = useStyles();
  const [elevation, setElevation] = useState(3);
  const bull = <span className={classes.bullet}>•</span>;
  return (
    <Link to={data.slug} style={{ textDecoration: "none" }}>
      <Card
        className={classes.card}
        elevation={elevation}
        onMouseOver={() => setElevation(12)}
        onMouseOut={() => setElevation(3)}
      >
        <CardContent>
          <div style={{ minHeight: 100 }}>
            <Typography variant="h5" component="h2">
              {data.name}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {data.category}
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              paddingTop: 8
            }}
          >
            <Typography
              variant="caption"
              component="p"
              style={{ marginRight: 8 }}
            >
              status
            </Typography>
            <Rating
              name="read-only"
              value={data.status}
              readOnly
              size="small"
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              paddingBottom: 20
            }}
          >
            <Typography
              variant="caption"
              component="p"
              style={{ marginRight: 8 }}
            >
              automation level
            </Typography>
            <Rating
              name="read-only"
              value={data.automationLevel}
              readOnly
              size="small"
            />
          </div>
          <Typography variant="body2" component="p">
            {data.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Link>
  );
};

function chunk(arr, size) {
  let chunked = [];
  for (let ele of arr) {
    let last = chunked[chunked.length - 1];
    if (!last || last.length === size) {
      chunked.push([ele]);
    } else {
      last.push(ele);
    }
  }
  return chunked;
}

const IndexTemplate = ({ tools, footerLinks }) => {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [toolboxData, setToolboxData] = useState(tools);

  const onSearchChanged = e => {
    const newSearchValue = e.target.value;
    setSearch(newSearchValue);
    const filteredData = tools.filter(toolboxEntry => {
      return (
        toolboxEntry.name
          .toLowerCase()
          .includes(newSearchValue.toLowerCase()) ||
        toolboxEntry.category
          .toLowerCase()
          .includes(newSearchValue.toLowerCase())
      );
    });
    setToolboxData(filteredData);
  };

  return (
    <>
      <Container maxWidth="sm">
        <Box
          my={4}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 80,
            marginBottom: 40
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: 24
            }}
          >
            <img
              src={require("../img/catapult.svg")}
              style={{ marginBottom: 0 }}
            />
            <Typography variant="h6" align="center">
              <span
                style={{
                  fontWeight: 600,
                  paddingTop: 20,
                  textAlign: "center",
                  color: "#555"
                }}
              >
                TOOLBOX ™️
              </span>
            </Typography>
          </div>

          <SearchBox value={search} onChange={onSearchChanged} />
        </Box>
      </Container>
      <Paper>
        <Tabs value={0} indicatorColor="primary" textColor="primary" centered>
          <Tab label="Overview"></Tab>
          <Tab label="Radar" />
        </Tabs>
      </Paper>
      <Container maxWidth="md" style={{ paddingTop: 64 }}>
        <Grid container spacing={4} alignItems="stretch">
          {chunk(toolboxData, 3).map((chunk, i) => {
            return (
              <Grid container style={{ marginBottom: 32 }} key={i}>
                {chunk.map((toolboxEntry, i) => {
                  return (
                    <Grid item md={4} key={i}>
                      <ToolboxEntry data={toolboxEntry} />
                    </Grid>
                  );
                })}
              </Grid>
            );
          })}
        </Grid>
      </Container>
      <Container
        style={{
          justifyContent: "space-between",
          display: "flex",
          marginTop: 32
        }}
        maxWidth="sm"
      >
        {footerLinks.map(({ title, slug }, i) => (
          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            key={i}
          >
            <MuiLink component={Link} to={slug} color="inherit">
              {title}
            </MuiLink>
          </Typography>
        ))}
      </Container>
      <Container style={{ padding: 32 }}>
        <Copyright />
      </Container>
    </>
  );
};

const Index = ({ data }) => {
  const tools =
    (data &&
      data.tools &&
      data.tools.edges.map(({ node }) => ({
        ...node.frontmatter,
        slug: node.fields.slug
      }))) ||
    [];

  const footerLinks =
    (data &&
      data.footer &&
      data.footer.edges.map(({ node }) => ({
        title: node.frontmatter.title,
        slug: node.fields.slug
      }))) ||
    [];

  return <IndexTemplate tools={tools} footerLinks={footerLinks} />;
};

export default Index;

export const pageQuery = graphql`
  query IndexQuery {
    tools: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "tool-page" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            name
            description
            status
            automationLevel
          }
        }
      }
    }

    footer: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "single-page" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
