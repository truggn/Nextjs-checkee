import React, { useEffect, useState } from "react";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import LastPageIcon from "@material-ui/icons/LastPage";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TextField,
  InputLabel,
  FormControl,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  Tooltip,
  Button,
  IconButton,
  TablePagination,
  Typography,
} from "@material-ui/core";
import XLSX from "xlsx";
import Grid from "@material-ui/core/Grid";
import { Formik } from "formik";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSelector, useDispatch } from "react-redux";
import { IUserProfile } from "../../redux/actions/LoginActions";
import { useTheme } from "@material-ui/core/styles";
//styles
import { createProduct } from "../../redux/actions/CreateProductActions";
import NProgress from "nprogress";
import { ICustomer } from "../../redux/actions/CustomerActions";
import getProductTypeofOrganization from "../../constant.config.api/api/getProductTypeOfOrganization";
import { useStyles } from "./CreateProduct.styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
interface DataFile {
  code: string;
  name: string;
}

interface product {
  code: string;
  name: string;
}
interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const classes = useStyles();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.tablepaginationroot}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}
interface ListTypeProduct {
  code: string;
  name: string;
  organizationId: string;
  _id: string;
}

export default function Participant_Form1(props) {
  const classes = useStyles();
  const [openParticipantForm, setOpenParticipantForm] = useState(false);

  const [checkEdit, setCheckEdit] = React.useState(false);

  const [participant, setParticipant] = React.useState(null);

  const [openModal, setOpenModal] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);

  const fileInput = React.useRef<any>(null);

  const [fileName, setFileName] = useState<string>("");

  const [message, setMessage] = useState<string>("");

  const [listTypeProduct, setListTypeProduct] = React.useState<
    ListTypeProduct[] | []
  >([]);

  const [dataFile, setDataFile] = useState<DataFile[]>([]);

  const customerData: ICustomer[] = useSelector(
    (state: any) => state.Customer.customerData
  );
  const [inputCustomer, setInputCustomer] =
    React.useState<ICustomer | null>(null);

  const [errorCustomer, setErrorCustomer] = React.useState<boolean>(false);

  const [inputProducttype, setInputProducttype] =
    React.useState<ListTypeProduct | null>(null);
  const [errorProducttype, setErrorProducttype] =
    React.useState<boolean>(false);

  const state_getuserlogindata: IUserProfile = useSelector(
    (state: any) => state.Login.getuserlogindata
  );

  const closeForm: boolean = useSelector(
    (state: any) => state.CreateProduct.loading
  );
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [page, setPage] = useState(0);

  const SheetJSFT = [
    "xlsx",
    "xlsb",
    "xlsm",
    "xls",
    "xml",
    "csv",
    "txt",
    "ods",
    "fods",
    "uos",
    "sylk",
    "dif",
    "dbf",
    "prn",
    "qpw",
    "123",
    "wb*",
    "wq*",
    "html",
    "htm",
  ]
    .map(function (x) {
      return "." + x;
    })
    .join(",");

  const dispatch = useDispatch();

  const initialFormValues = {
    status: "",
    createdBy: state_getuserlogindata._id,
    organizationId: "",
    productTypeId: "",
    filename: "",
    products: [],
  };

  useEffect(() => {
    setCheckEdit(props.checkEdit);
  }, [props.checkEdit]);

  useEffect(() => {
    setOpenParticipantForm(openParticipantForm);
  }, [openParticipantForm]);

  useEffect(() => {
    setParticipant(props.participant);
  }, [props.participant]);

  const handleOpen = () => {
    setOpenModal(true);
    setOpenParticipantForm(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setOpenParticipantForm(false);
    setDataFile([]);
    // setDataProductTypeOfOrganization([]);
    setMessage("");
  };

  //pagination

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, dataFile.length - page * rowsPerPage);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleUpFile = (file: File): void => {
    const promise = new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);

      reader.onload = (e: any) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };

      reader.onerror = (err) => {
        reject(err);
      };
    });

    promise.then((data: DataFile[]) => {
      let objectKey = data ? data[0] : [];
      let Keys = Object.keys(objectKey);
      if (Keys.length === 2 && Keys[0] === "code" && Keys[1] === "name") {
        setDataFile(data);
      } else {
        setMessage(
          "File kh??ng ????ng v???i ?????nh d???ng m???u.H??y t???i file ????ng v???i file m???u"
        );
      }
    });
  };

  const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    setMessage("");
    setDataFile([]);
    if (files && files[0]) {
      handleUpFile(files[0]);
      setFileName(files[0].name);
    }
    event.target.value = "";
  };
  const handleChangeCustomerName = async (id) => {
    try {
      let result = await getProductTypeofOrganization(id._id);
      if (result.status === 200) {
        setListTypeProduct(result.data.data);
      }
    } catch (error) {
      console.log(`error`, error);
    }
  };

  return (
    <React.Fragment>
      {checkEdit ? (
        <Tooltip title="Ch???nh s???a" placement="top-start">
          <IconButton
            className={classes.iconButton}
            aria-label="edit"
            size="small"
            color="primary"
            onClick={handleOpen}
          >
            <EditOutlinedIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Button
          size="small"
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<AddCircleOutlineOutlinedIcon />}
          onClick={handleOpen}
        >
          Th??m m???i
        </Button>
      )}
      <Dialog
        open={openParticipantForm}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="md"
        scroll="body"
      >
        <Formik
          initialValues={initialFormValues}
          onSubmit={(values: any): void => {
            values.filename = fileName;
            if (message !== "") {
              return;
            }
            if (inputProducttype || inputCustomer) {
              values.products = dataFile;
              values.productTypeId = inputProducttype?._id;
              values.organizationId = inputCustomer?._id;
              dispatch(createProduct(values));
              NProgress.start();
            } else {
              setErrorCustomer(true);
              setErrorProducttype(true);
            }
          }}
        >
          {(props) => {
            return (
              <form onSubmit={props.handleSubmit}>
                <DialogTitle id="form-dialog-title">
                  {!checkEdit ? "Th??m m???i s???n ph???m" : ""}
                </DialogTitle>
                <DialogContent>
                  <Grid container spacing={1}>
                    <Grid item xs={12} md={6} sm={6}>
                      <InputLabel id="" style={{ marginLeft: "10px" }}>
                        ?????i t??c
                      </InputLabel>

                      <FormControl
                        fullWidth={true}
                        size="small"
                        variant="outlined"
                      >
                        <Autocomplete
                          value={inputCustomer}
                          onChange={(
                            event: any,
                            newValue: ICustomer | null
                          ) => {
                            setInputCustomer(newValue);
                            handleChangeCustomerName(newValue);
                            setErrorCustomer(false);
                          }}
                          id="customer"
                          options={customerData}
                          getOptionLabel={(option) => {
                            if (typeof option === "string") {
                              return option;
                            }

                            if (option.name_customer) {
                              return option.name_customer;
                            }

                            return option.name_customer;
                          }}
                          renderOption={(option) => option.name_customer}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              size="medium"
                            />
                          )}
                        />
                        {errorCustomer ? (
                          <Typography
                            style={{
                              marginLeft: 14,
                              marginTop: 5,
                              fontSize: "0.75rem",
                              color: "#f44336",
                            }}
                          >
                            Vui l??ng ch???n ?????i t??c{" "}
                          </Typography>
                        ) : null}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel id="" style={{ marginLeft: "10px" }}>
                        Lo???i s???n ph???m
                      </InputLabel>
                      <FormControl
                        fullWidth={true}
                        size="small"
                        variant="outlined"
                      >
                        <Autocomplete
                          id="producttype"
                          options={listTypeProduct}
                          getOptionLabel={(option) => option.name}
                          value={inputProducttype}
                          onChange={(event, newInputValue) => {
                            setInputProducttype(newInputValue);
                            setErrorProducttype(false);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              size="medium"
                            />
                          )}
                        />
                        {errorProducttype ? (
                          <Typography
                            style={{
                              marginLeft: 14,
                              marginTop: 5,
                              fontSize: "0.75rem",
                              color: "#f44336",
                            }}
                          >
                            Vui l??ng ch???n lo???i s???n ph???m
                          </Typography>
                        ) : null}
                      </FormControl>
                    </Grid>

                    <Grid item md={12}>
                      <Grid container spacing={1}>
                        <Grid item>
                          <Typography component="h4">
                            Upload d??? li???u:
                            <input
                              className={classes.input}
                              name="filename"
                              id="contained-button-file"
                              ref={fileInput}
                              // multiple
                              accept={SheetJSFT}
                              type="file"
                              onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                // props.handleChange(event);
                                onChangeFile(event);
                              }}
                            />
                            <label htmlFor="contained-button-file">
                              <Button
                                color="primary"
                                startIcon={<CloudUploadIcon />}
                                component="span"
                              >
                                Upload File
                              </Button>
                            </label>
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography component="p">
                            T???i file m???u t???i ????y:
                            <Button component="span" color="primary">
                              Links
                            </Button>
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    {message !== "" ? (
                      <Typography component="p" className={classes.message}>
                        {message}
                      </Typography>
                    ) : null}
                    <Grid item md={12}>
                      <TableContainer component={Paper}>
                        <Table
                          className={classes.table}
                          aria-label="simple pagination table"
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell className={classes.tableRightBorder}>
                                M?? s???n ph???m
                              </TableCell>
                              <TableCell className={classes.tableRightBorder}>
                                T??n s???n ph???m
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {dataFile.length > 0
                              ? (rowsPerPage > 0
                                  ? dataFile.slice(
                                      page * rowsPerPage,
                                      page * rowsPerPage + rowsPerPage
                                    )
                                  : dataFile
                                ).map((datafile, index) => {
                                  return (
                                    <TableRow key={index}>
                                      <TableCell
                                        component="th"
                                        scope="row"
                                        className={classes.tableRightBorder}
                                      >
                                        {datafile.code}
                                      </TableCell>
                                      <TableCell
                                        component="th"
                                        scope="row"
                                        className={classes.tableRightBorder}
                                      >
                                        {datafile.name}
                                      </TableCell>
                                    </TableRow>
                                  );
                                })
                              : null}
                          </TableBody>
                          <TableFooter>
                            <TableRow>
                              <TablePagination
                                rowsPerPageOptions={[
                                  5,
                                  10,
                                  { label: "All", value: -1 },
                                ]}
                                colSpan={8}
                                count={
                                  dataFile.length > 0 ? dataFile.length : 0
                                }
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                  inputProps: {
                                    "aria-label": "state_product per page",
                                  },
                                  native: true,
                                }}
                                labelDisplayedRows={({ from, to, count }) =>
                                  `??ang xem ${from} ?????n ${to} trong t???ng s??? ${count} m???c`
                                }
                                labelRowsPerPage={"H??ng m???i trang"}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                              />
                            </TableRow>
                          </TableFooter>
                        </Table>
                      </TableContainer>
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button
                    size="small"
                    variant="contained"
                    className={classes.button}
                    onClick={handleClose}
                    color="default"
                  >
                    ????ng
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    className={classes.button}
                    color="primary"
                    type="submit"
                  >
                    L??u
                  </Button>
                </DialogActions>
              </form>
            );
          }}
        </Formik>
      </Dialog>
      <Backdrop open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  );
}
