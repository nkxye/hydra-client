import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

//background image
import landingBG from "./../assets/landingBG.png";

//for table
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { getPDF } from "./../api/crop";
import { loadPastCrops } from "./../api/crop";
import ISODateFormatter from "iso-date-formatter";
import dateFormat from "dateformat";

function createData(cropName, setupName, datePlanted, dateHarvested) {
  return { cropName, setupName, datePlanted, dateHarvested };
}

// const rows = [
//   createData("Pechay Trial", "HYD-1", "April 02, 2021", "June 11, 2021"),
//   createData("Basil 1", "HYD-1", "April 21, 2021", "May 10, 2021"),
//   createData("Lettuce for Mom", "HYD-1", "May 01, 2021", "May 11, 2021"),
//   createData("Lettuce", "HYD-1", "May 31, 2021", "May 11, 2021"),
//   createData("Romaine", "HYD-1", "May 12, 2021", "May 22, 2021"),
//   createData("Tomatoes", "HYD-1", "June 02, 2021", "June 07, 2021"),
//   createData("Basil Trial", "HYD-1", "April 14, 2021", "May 05, 2021"),
//   createData("Basil 2", "HYD-1", "June 01, 2021", "June 10, 2021"),
//   createData("Basil 4", "HYD-2", "April 14, 2021", "April 20, 2021"),
//   createData("Tomatoes 2", "HYD-3", "May 27, 2021", "May 30, 2021"),
//   createData("Tomatoes Trial", "HYD-3", "April 30, 2021", "May 16, 2021"),
//   createData("Lettuce Trial", "HYD-4", "May 31, 2021", "June 02, 2021"),
//   createData("Basil 3", "HYD-2", "April 16, 2021", "May 25, 2021"),
//   createData("Tomatoes 3", "HYD-4", "May 23, 2021", "June 05, 2021"),
//   createData("Pechay 1", "HYD-2", "May 25, 2021", "May 30, 2021"),
//   createData("Tomatoes 4", "HYD-2", "April 31, 2021", "May 23, 2021"),
//   createData("Pechay 2", "HYD-3", "April 10, 2021", "May 21, 2021"),
//   createData("Pechay 3", "HYD-4", "June 05, 2021", "June 11, 2021"),
//   createData("Pechay 4", "HYD-2", "May 12, 2021", "May 21, 2021"),
//   createData("Tomatoes 3", "HYD-1", "June 06, 2021", "June 11, 2021"),
// ];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backgroundImage: {
    flexGrow: 1,
    minHeight: "200vh",
    backgroundColor: "#f6f6f6",
    backgroundImage: `url(${landingBG})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    "@media (max-width: 768px)": {
      backgroundImage: "none",
    },
  },
  header_iamge: {
    width: "100%",
    height: "100%",
  },
  history_container: {
    minHeight: "20vh",
    display: "flex",
    paddingTop: "130px",
    padding: "40px",
    borderRadius: "10px",
    "@media (max-width: 768px)": {
      paddingLeft: "0px",
      paddingRight: "0px",
    },
  },
  table_container: {
    minHeight: "20vh",
    display: "flex",
    paddingTop: "20px",

    padding: "40px",
    borderRadius: "10px",
    "@media (max-width: 768px)": {
      padding: "0px",
    },
  },
  hydra_logo: {
    height: "70px",
    marginBottom: "150px",
  },
  history_header: {
    color: "#2e604a",
    fontWeight: "bold",
    fontSize: "35px",
  },
  history_description: {
    color: "black",
    paddingTop: "10px",
    fontSize: "18px",
    "@media (max-width: 768px)": {
      overflow: "hidden",
    },
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
    fontWeight: "bold",
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  viewButton: {
    // green
    backgroundColor: "#376e57",
    color: "#fff",
    borderRadius: "20px",
    fontSize: "12px",
    padding: "10px 40px",
    "&:hover": {
      color: "#2e604a",
    },
  },
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const headCells = [
    {
      id: "cropName",
      numeric: false,
      disablePadding: true,
      label: "Crop Name",
    },
    {
      id: "setupName",
      numeric: true,
      disablePadding: false,
      label: "Setup Name",
    },
    {
      id: "datePlanted",
      numeric: true,
      disablePadding: false,
      label: "Date Planted",
    },
    {
      id: "dateHarvested",
      numeric: true,
      disablePadding: false,
      label: "Date Harvested",
    },
    { id: "2", numeric: true, disablePadding: false, label: "" },
    { id: "3", numeric: true, disablePadding: false, label: "" },
  ];

  return (
    <TableHead>
      <TableRow>
        <TableCell></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              style={{ fontWeight: "bold" }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function HistoryPage() {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("setupName");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    loadPastCrops((callback) => {
      console.log(callback);
      let data = callback.data;
      if (callback.status === 200) {
        setHistoryData(data);
      }
    });
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = historyData.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const getReport = (pod_name, crop_id) => {
    console.log(pod_name, crop_id);
    let data = {
      pod_name: pod_name,
      crop_id: crop_id,
    };
    getPDF(data, (callback) => {
      console.log(callback);
      window.open(`${callback.config.url}`, "_blank");
    });
  };

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, historyData.length - page * rowsPerPage);

  // const isoDate = '2019-06-04T14:03:07.007Z';
  // const formattedDate = ISODateFormatter(isoDate, { format: 'dd MMM yyyy HH:mm' }); // => 04 06 2019 14:03

  var dateFormat = require("dateformat");
  var now = new Date();

  return (
    <div className={classes.backgroundImage}>
      <Grid container justify="center">
        <Grid item xs={10} className={classes.history_container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography className={classes.history_header} variant="h5">
                History
              </Typography>
              <Typography
                variant="body2"
                className={classes.history_description}
              >
                Crops harvested within the past 2 months should be visible here.
                Click on "View" to open a PDF containing the corresponding
                information and journal entries.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container justify="center">
        <Grid item xs={10} className={classes.table_container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <div className={classes.root}>
                <Paper className={classes.paper}>
                  <TableContainer>
                    <Table
                      className={classes.table}
                      aria-labelledby="tableTitle"
                      aria-label="enhanced table"
                    >
                      <EnhancedTableHead
                        classes={classes}
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={historyData.length}
                      />
                      <TableBody>
                        {stableSort(historyData, getComparator(order, orderBy))
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((row, index) => {
                            const isItemSelected = isSelected(row.name);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                              <TableRow
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={row.crop_name}
                                selected={isItemSelected}
                              >
                                <TableCell padding="checkbox"></TableCell>
                                <TableCell
                                  component="th"
                                  id={labelId}
                                  scope="row"
                                  padding="none"
                                >
                                  {row.crop_name}
                                </TableCell>
                                <TableCell align="right">
                                  {row.pod_name}
                                </TableCell>
                                <TableCell align="right">
                                  {dateFormat(row.createdAt, "mmmm dS, yyyy")}
                                </TableCell>
                                <TableCell align="right">
                                  {dateFormat(row.updatedAt, "mmmm dS, yyyy")}
                                  {/* {ISODateFormatter(row.updatedAt, { format: 'MMM/dd/yyyy' })} */}
                                </TableCell>
                                <TableCell align="right">
                                  {row.protein}
                                </TableCell>
                                <TableCell align="right">
                                  <Button
                                    type="submit"
                                    className={classes.viewButton}
                                    onClick={() =>
                                      getReport(row.pod_name, row._id)
                                    }
                                  >
                                    View
                                  </Button>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        {emptyRows > 0 && (
                          <TableRow>
                            <TableCell colSpan={6} />
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 20]}
                    component="div"
                    count={historyData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                  />
                </Paper>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
export default HistoryPage;
