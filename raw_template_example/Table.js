const {
  Button,
  Table, TableBody, TableCell, TableHead, TableRow,
  TextField,
  Paper,
  colors,
  createMuiTheme,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon,
  MuiThemeProvider,
  Typography,
  withStyles,
} = window['material-ui'];
const theme = createMuiTheme({
  palette: {
    primary: {
      light: colors.purple[300],
      main: colors.purple[500],
      dark: colors.purple[700],
    },
    secondary: {
      light: colors.green[300],
      main: colors.green[500],
      dark: colors.green[700],
    },
  },
  typography: {
    useNextVariants: true,
  },
});
const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
  icon: {
    marginRight: theme.spacing.unit,
  },
});

class Sample extends React.Component {
  state = {
    open: false,
    editing: undefined
  };
  handleClose = () => {
    this.setState({
      open: false,
      editing: undefined
    });
  };
  handleClick = () => {
    this.setState({
      open: true,
    });
  };
  editRow = row => {
    this.setState({ open: true, editing: row.id })
  };

  renderCell = (cell) => (
    <TableCell align="right">{cell}</TableCell>
  )
  renderRow = (row) => (
    <TableRow key={row.id}>
      <TableCell component="th" scope="row">
        test data
      </TableCell>
      {Object.keys(row).map(this.renderCell)}
      <TableCell align="right">
        <Button variant="outlined" color="primary" onClick={e => this.editRow(row)}>edit</Button>
      </TableCell>
    </TableRow>
  )

  render() {
    const { classes, data } = this.props;
    const { open } = this.state;
    return (
      <Paper>
        <Table>
          <TableHead>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat (g)</TableCell>
            <TableCell align="right">Carbs (g)</TableCell>
            <TableCell align="right">Protein (g)</TableCell>
          </TableHead>
          <TableBody>
            {data.map(this.renderRow)}
          </TableBody>
        </Table>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send
              updates occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label={this.state.editing}
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    );
  }
}
const App = withStyles(styles)(Sample);
