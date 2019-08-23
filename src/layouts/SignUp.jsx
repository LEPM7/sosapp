import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import logo from "../images/alarm.svg";
import { withStyles } from "@material-ui/core/styles";
import auth from "../auth";
import { withRouter } from 'react-router-dom'


class SignUp extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleSubmit(event) {
    auth.signUp(this.state.email, this.state.password)
        .then(s => {
          console.log('success', s);
          this.props.history.push('/admin/dashboard');
        })
        .catch(e => {
          this.setState({error: true})
        });
    event.preventDefault();
  }

  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="sm">
        {/* <CssBaseline /> */}
        <div className={classes.paper}>
          <img src={logo} width="20%" />
          <Typography component="h1" variant="h5">
            S.O.S
          </Typography>
          <Typography component="h1" variant="h5">
            Centro de gestión de emergencias
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={this.handleSubmit}
          >
            <Grid container spacing={2}>
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                />
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={this.state["email"]}
                  onChange={this.handleChange}
                  error={this.state.error}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={this.state["password"]}
                  onChange={this.handleChange}
                  error={this.state.error}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Registrate
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Ya tienes cuenta? Ingresa
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

export default withRouter(withStyles(theme => ({
  paper: {
    backgroundColor: "white",
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(3)
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))(SignUp));
