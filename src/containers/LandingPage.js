import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import SwapVertIcon from "@material-ui/icons/SwapVert";
import { Button, Typography } from "@material-ui/core";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Slider from "@material-ui/core/Slider";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/core/styles";
import Pdf from "./../assets/Hydra_User_Guide.pdf";

//images
import headerImage from "../assets/header_image.png";
import smallTomatoes from "../assets/small_tomatoes.png";
import differentVegetables from "../assets/different_vegetables.jpg";
import FooterWaveImage from "./../assets/footerWave.png";
import circleHydra from "./../assets/hydra_logo_circle_white.png";
import wave_header from "./../assets/wave_hedaer.png";
import leaf from "./../assets/leaf.png";
import reddit from "./../assets/reddit.png";
import redditBasil from "./../assets/redditbasil.jpg";
import redditSetup from "./../assets/redditsetup.jpg";
import redditTomatoes from "./../assets/redditTomatoes.jpg";

//lottie
import lottie from "lottie-web";

//components
import ActiveCropsCards from "./../components/activeCropsCards";
import PlaceHolderCropCard from "./../components/placeHolderCropCard";
import RedditThreads from "./../components/redditThread";

//extras
import Carousel, { consts } from "react-elastic-carousel";

//background image
import "./../components/css/backgroundStyles.css";

// helpers
import { getClientName } from "./../helpers/clientHelpers";

//api
import { addNewCrop } from "./../api/crop";
import { getActiveCrops } from "./../api/crop";
import { checkUserAuth } from "./../helpers/userAuthHelpers";
import { loadPods } from "./../api/pods";
import { cropPresets } from "./../api/presets";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minHeight: "150vh",
    backgroundColor: "#f6f6f6",
    //backgroundColor: "tomato",
    backgroundImage: `url(${FooterWaveImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "bottom",
    "@media (max-width: 768px)": {
      marginTop: "10vh",
    },
  },
  wave_bg: {
    backgroundImage: `url(${wave_header})`,
  },
  header_iamge: {
    width: "100%",
    height: "100%",
    "@media (max-width: 768px)": {
      height: "30vh",
      width: "100%",
      objectFit: "cover",
    },
  },
  supp_image_diff: {
    height: "30vh",
    backgroundImage: `url(${differentVegetables})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    padding: "20px",
    margin: "20px",
    borderRadius: "20px",
  },
  supp_image_tomato: {
    height: "30vh",
    backgroundImage: `url(${smallTomatoes})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    padding: "20px",
    margin: "20px",
    borderRadius: "20px",
  },
  active_crops_container: {
    paddingTop: "5vh",
  },
  active_crop_card_container: {
    minHeight: "30vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "50px",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
  },
  welcome_text: {
    textAlign: "left",
    color: "#2e604a",
    display: "flex",
    "@media (max-width: 768px)": {
      justifyContent: "center",
      textAlign: "center",
    },
  },
  add_to_screen_button: {
    marginTop: "20px",
    backgroundColor: "#2e604a",
    color: "#fff",
    borderRadius: "50px",
    "&:hover": {
      color: "#2e604a",
      backgroundColor: "white",
    },
  },
  welcome_text_container: {
    display: "flex",
    alignItems: "center",
  },
  hydra_logo: {
    height: "70px",
    marginBottom: "50px",
  },
  footer_styles: {
    marginTop: "10vh",
  },
  thread_container: {
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "white",
    minHeight: "50vh",
    marginTop: "50px",
  },
  hydro_text: {
    color: "#2e604a",
    fontWeight: "bold",
  },
  supp_image_diff_contents_text: {
    color: "white",
    fontWeight: "bold",
  },
  supp_image_diff_contents_text_non_bold: {
    color: "white",
  },
  new_crop_button: {
    transform: "translateY(-120%)",
    "@media (max-width: 768px)": {
      transform: "translateY(-80%)",
    },
    borderRadius: "20px",
    color: "#2e604a",
    backgroundColor: "white",
    "&:hover": {
      color: "white",
      backgroundColor: "#2e604a",
    },
  },
  btn_right: {
    display: "flex",
    justifyContent: "flex-end",
  },
  active_crops_text: {
    color: "#2e604a",
    fontWeight: "bold",
    paddingLeft: "25px",
    paddingTop: "10px",
  },
  sortby_button_container: {
    display: "flex",
    justifyContent: "flex-end",
  },
  sortby_button: {
    boxShadow:
      "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)",
    borderRadius: "10px",
    marginRight: "7%",
  },
  active_crop_card_title_button: {
    paddingTop: "10px",
    paddingBottom: "10px",
  },
  reddit_button: {
    // green
    backgroundColor: "#376e57",
    color: "#fff",
    borderRadius: "20px",
    fontSize: "12px",
    paddingLeft: "10px",
    paddingRight: "10px",
    "&:hover": {
      color: "#2e604a",
      backgroundColor: "white",
      border: "1px solid #2e604a",
    },
  },
  progressbar_container: {
    minHeight: "30vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "50px",
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "10px",
  },
  divider_right: {
    borderRight: "1px solid #989898	",
    "@media (max-width: 768px)": {
      borderRight: "0",
    },
  },
  modal: {
    position: "absolute",
    top: "10%",
    left: "35%",
    width: 500,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(5),
    borderRadius: 16,
    outline: "none",
    "@media (max-width: 768px)": {
      width: "inherit",
      height: "100%",
      zIndex: 100,
      top: 0,
      left: 0,
      borderRadius: 0,
    },
  },
  new_crop_desc: {
    marginTop: "10px",
  },
  hide_for_desc_mob: {
    "@media (max-width: 768px)": {
      display: "none",
    },
  },
  new_crop_desc_text_field: {
    borderRadius: "10px",
  },
  form_new_crop: {
    marginTop: "10px",
  },
  thumb: {
    background: "white",
    border: "0.1em solid silver",
  },
  track: {
    background: "#376e57",
  },
  rail: {
    background: "silver",
  },
  save_btn_modal: {
    // green
    backgroundColor: "#376e57",
    color: "#fff",
    borderRadius: "20px",
    fontSize: "12px",
    padding: "10px 40px",
    "&:hover": {
      color: "#2e604a",
      backgroundColor: "white",
      border: "1px solid #2e604a",
    },
  },
  back_btn_modal: {
    borderRadius: "20px",
    border: "1px solid silver",
    fontSize: "12px",
    padding: "10px 40px",
    marginRight: "10px",
  },
  lottie_container: {
    transform: "translateX(-15%)",
  },
  quick_help_container: {
    paddingLeft: "1.5%",
    paddingRight: "1.5%",
  },
  farmer_svg: {
    "@media (max-width: 768px)": {
      marginLeft: "30%",
    },
  },
  overrides: {
    MuiFormControlLabel: {
      label: {
        fontSize: 30,
      },
    },
  },

  thread_title: {
    color: "#2e604a",
    fontWeight: "bold",
    "&:hover": {
      cursor: "pointer",
    },
    "@media (max-width: 768px)": {
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
    },
  },
  thread_image_container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  thread_image: {
    width: "35%",
    "&:hover": {
      cursor: "pointer",
    },
  },
  thread_image_two: {
    width: "60%",
    "&:hover": {
      cursor: "pointer",
    },
  },
  op_deets: {
    fontSize: ".75rem",
    // "@media (max-width: 768px)": {
    //   display: "none",
    // },
    "&:hover": {
      textDecoration: "underline",
      cursor: "pointer",
    },
  },
  post_deets: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingTop: "20px",
    paddingBottom: "20px",
  },
  redditRoot: {
    height: "25vh",
    marginBottom: "30px",
    marginTop: "20px",
    padding: "10px",
    borderRadius: "10px",
    boxShadow:
      "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)",
    "@media (max-width: 768px)": {
      height: "30vh",
    },
  },
}));

function LandingPage() {
  const classes = useStyles();
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const farmer = useRef(null);

  const [open, setOpen] = useState(false);
  const [temp, setTemp] = React.useState([17, 22]);
  const [humid, setHumid] = React.useState([25, 55]);
  const [EC, setEC] = React.useState([1.5, 3.0]);
  const [PH, setPH] = React.useState([5.5, 5.0]);
  const [values, setValues] = useState({
    cropName: "",
    harvestDate: "",
    temperature: "",
    humidity: "",
    ECThreshhold: "",
  });
  // sets value for crop name
  const [value, setValue] = React.useState(null);
  // sets value for podname
  const [podName, setPodName] = React.useState(null);
  // store crops here after loading from api
  const [cropsList, setCropList] = useState([]);
  // stores pods list here after loading from api
  const [podsList, setPodsList] = useState([]);
  const [state, setState] = React.useState({
    checkedG: false,
    isLoggedIn: false,
  });
  // state for images
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  // state for active crops
  const [activeCrops, setActiveCrops] = useState([]);

  // image upload handle
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  // sets user to guest if not logged in
  useEffect(() => {
    getClientName();
    console.log(getClientName());
  }, []);
  // handles changes
  const handleChange = (prop) => (event) => {
    setValues({
      ...values,
      [prop]: event.target.value,
    });
  };

  useEffect(() => {
    const isAuth = checkUserAuth();
    if (isAuth) {
      setState((prevState) => ({
        ...prevState,
        isLoggedIn: checkUserAuth(),
      }));
      //load pods
      loadPods((callback) => {
        //console.log(callback.data);
        const data = callback.data;
        setPodsList(data);
      });
      //oad presets
      cropPresets((callback) => {
        console.log(callback);
        const data = callback.data;
        setCropList(data);
      });
    } else {
      setState((prevState) => ({
        ...prevState,
        isLoggedIn: false,
      }));
    }
  }, []);

  const handleChanges = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  // for slider
  const handleTempChange = (event, newValue) => {
    setTemp(newValue);
  };
  const handleHumidChange = (event, newValue) => {
    setHumid(newValue);
  };
  const handleEcChange = (event, newValue) => {
    setEC(newValue);
  };
  const handlePhChange = (event, newValue) => {
    setPH(newValue);
  };
  function valuetext(value) {
    return `${value}°C`;
  }

  // useEffect to get crops
  useEffect(() => {
    getActiveCrops((callback) => {
      if (callback.status === 200) {
        //console.log(callback);
        const data = callback.data;
        setActiveCrops(data);
      }
    });
  }, []);

  // for modal
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // for autocomplete field
  const filter = createFilterOptions();

  // const cropsList = [
  //   { title: "Tomatoes" },
  //   { title: "Potatoes" },
  //   { title: "Carrots" },
  // ];

  //const podsList = [{ title: "hyd-1" }, { title: "hyd-2" }, { title: "hyd-3" }];

  // //file upload image in start new crop modal
  // const onChange = (e) => {
  //   const file = e.target.files[0];
  //   const storageRef = file.storage().ref();
  //   const fileRef = storageRef.child(file.name);
  //   fileRef.put(file).then(() => {
  //     console.log("Uploaded a file");
  //   });
  // };

  //checkbox color
  const GreenCheckbox = withStyles({
    root: {
      color: "#376e57",
      "&$checked": {
        color: "#376e57",
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

  const myArrow = ({ type, onClick, isEdge }) => {
    const pointer =
      type === consts.PREV ? (
        isEdge ? (
          ""
        ) : (
          <ArrowBackIosIcon />
        )
      ) : isEdge ? (
        ""
      ) : (
        <ArrowForwardIosIcon />
      );
    return (
      <Button onClick={onClick} disabled={isEdge}>
        {pointer}
      </Button>
    );
  };

  // lottie
  useEffect(() => {
    lottie.loadAnimation({
      container: farmer.current,
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: require("./../assets/lottie/farmer-lottie.json"),
    });
  }, [0]);

  // on start new crop submit
  const onStartNewCrop = () => {
    let data = {
      cropName: value.preset_name,
      setupName: podName.pod_name,
      tempStart: temp[0],
      tempEnd: temp[1],
      humidityStart: humid[0],
      humidityEnd: humid[1],
      conductivityStart: EC[0],
      conductivityEnd: EC[1],
      phStart: PH[0],
      phEnd: PH[1],
      initializePumps: state.checkedG === true ? "on" : "off",
    };

    addNewCrop(data, (callback) => {
      console.log(callback);
      if (callback.status === 201) {
        console.log("Crop Added");
      }
    });
    setOpen(false);
    window.location.reload();
  };

  // Items inside modal
  const body = (
    <div className={classes.modal}>
      <Typography className={classes.hydro_text}> Start New Crop</Typography>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          onStartNewCrop();
        }}
      >
        <Grid container className={classes.hide_for_desc_mob}>
          <Grid item xs={10}>
            <Typography color="textSecondary" className={classes.new_crop_desc}>
              To create a crop with a new preset, enter a unique crop name.
              Otherwise, choose from the suggestions on the dropdown to reuse an
              existing preset.
            </Typography>
          </Grid>
          <Grid
            item
            xs={2}
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <div className={classes.imageUpload}>
              <label htmlFor="fileInput">
                <img src={leaf} />
              </label>
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={changeHandler}
              />
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={3} className={classes.form_new_crop}>
          <Grid item xs={12} md={6}>
            {/* CROP NAME */}
            <Typography>
              <b>Crop Name</b>
            </Typography>
            <Autocomplete
              value={value}
              fullWidth={true}
              onChange={(event, newValue) => {
                if (typeof newValue === "string") {
                  setValue({
                    preset_name: newValue,
                  });
                } else if (newValue && newValue.inputValue) {
                  // Create a new value from the user input
                  setValue({
                    preset_name: newValue.inputValue,
                  });
                } else {
                  setValue(newValue);
                }
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);

                // Suggest the creation of a new value
                if (params.inputValue !== "") {
                  filtered.push({
                    inputValue: params.inputValue,
                    preset_name: `Add "${params.inputValue}"`,
                  });
                }

                return filtered;
              }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              id="cropNameField"
              options={cropsList}
              getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === "string") {
                  return option;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                  return option.inputValue;
                }
                // Regular option
                return option.preset_name;
              }}
              renderOption={(option) => option.preset_name}
              style={{ width: 250 }}
              renderInput={(params) => (
                <TextField {...params} label="" variant="outlined" required />
              )}
            />
          </Grid>
          {/* POD NAME */}
          <Grid item xs={12} md={6}>
            <Typography>
              <b>Setup Name</b>
            </Typography>
            <Autocomplete
              value={podName}
              id="podNameField"
              options={podsList}
              getOptionLabel={(option) => option.pod_name}
              style={{ width: 250 }}
              onChange={(event, newValue) => {
                if (typeof newValue === "string") {
                  setPodName({
                    pod_name: newValue,
                  });
                } else if (newValue && newValue.inputValue) {
                  // Create a new value from the user input
                  setPodName({
                    pod_name: newValue.inputValue,
                  });
                } else {
                  setPodName(newValue);
                }
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);

                // Suggest the creation of a new value
                if (params.inputValue !== "") {
                  filtered.push({
                    inputValue: params.inputValue,
                    pod_name: `Add "${params.inputValue}"`,
                  });
                }

                return filtered;
              }}
              getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === "string") {
                  return option;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                  return option.inputValue;
                }
                // Regular option
                return option.pod_name;
              }}
              renderInput={(params) => (
                <TextField {...params} label="" variant="outlined" required />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography id="range-slider" gutterBottom>
              Temperature Threshold (°C)
            </Typography>
            <Slider
              value={temp}
              onChange={handleTempChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              getAriaValueText={valuetext}
              min={10}
              max={40}
              classes={{
                thumb: classes.thumb,
                rail: classes.rail,
                track: classes.track,
                valueLabel: classes.valueLabel,
                mark: classes.mark,
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                style={{
                  border: "1px solid silver",
                  paddingLeft: 10,
                  paddingRight: 10,
                  borderRadius: 5,
                  fontSize: 12,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {temp[0]}
              </Typography>
              <Typography
                style={{
                  border: "1px solid silver",
                  paddingLeft: 10,
                  paddingRight: 10,
                  borderRadius: 5,
                  fontSize: 12,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {temp[1]}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Typography id="range-slider" gutterBottom>
              Humidity Threshold (%)
            </Typography>
            <Slider
              min={0}
              max={100}
              value={humid}
              onChange={handleHumidChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              getAriaValueText={valuetext}
              classes={{
                thumb: classes.thumb,
                rail: classes.rail,
                track: classes.track,
                valueLabel: classes.valueLabel,
                mark: classes.mark,
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                style={{
                  border: "1px solid silver",
                  paddingLeft: 10,
                  paddingRight: 10,
                  borderRadius: 5,
                  fontSize: 12,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {humid[0]}
              </Typography>
              <Typography
                style={{
                  border: "1px solid silver",
                  paddingLeft: 10,
                  paddingRight: 10,
                  borderRadius: 5,
                  fontSize: 12,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {humid[1]}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Typography id="range-slider" gutterBottom>
              EC Threshold (mS/cm)
            </Typography>
            <Slider
              step={0.01}
              min={0.0}
              max={5.0}
              value={EC}
              onChange={handleEcChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              getAriaValueText={valuetext}
              classes={{
                thumb: classes.thumb,
                rail: classes.rail,
                track: classes.track,
                valueLabel: classes.valueLabel,
                mark: classes.mark,
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                style={{
                  border: "1px solid silver",
                  paddingLeft: 10,
                  paddingRight: 10,
                  borderRadius: 5,
                  fontSize: 12,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {EC[0]}
              </Typography>
              <Typography
                style={{
                  border: "1px solid silver",
                  paddingLeft: 10,
                  paddingRight: 10,
                  borderRadius: 5,
                  fontSize: 12,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {EC[1]}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Typography id="range-slider" gutterBottom>
              Acidity Threshold (pH)
            </Typography>
            <Slider
              step={0.01}
              min={0.0}
              max={14.0}
              value={PH}
              onChange={handlePhChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              getAriaValueText={valuetext}
              classes={{
                thumb: classes.thumb,
                rail: classes.rail,
                track: classes.track,
                valueLabel: classes.valueLabel,
                mark: classes.mark,
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                style={{
                  border: "1px solid silver",
                  paddingLeft: 10,
                  paddingRight: 10,
                  borderRadius: 5,
                  fontSize: 12,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {PH[0]}
              </Typography>
              <Typography
                style={{
                  border: "1px solid silver",
                  paddingLeft: 10,
                  paddingRight: 10,
                  borderRadius: 5,
                  fontSize: 12,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {PH[1]}
              </Typography>
            </div>
          </Grid>

          <Grid container>
            <Grid item xs={5}>
              <FormControlLabel
                control={
                  <GreenCheckbox
                    checked={state.checkedG}
                    onChange={handleChanges}
                    name="checkedG"
                  />
                }
                label={
                  <Typography style={{ fontWeight: 600 }}>
                    Initialize Pumps
                  </Typography>
                }
              />
            </Grid>
            <Grid
              item
              xs={7}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button
                className={classes.back_btn_modal}
                onClick={() => handleClose()}
              >
                Back
              </Button>
              <Button
                type="submit"
                className={classes.save_btn_modal}
                //onClick={() => onStartNewCrop()}
              >
                Let's Start!
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );

  return (
    <>
      <div className={classes.root}>
        {/* Hero */}
        <Grid container spacing={0} justify="center">
          <Grid item xs={12} className={classes.wave_bg}>
            <img className={classes.header_iamge} src={headerImage} />
          </Grid>
          <Grid item xs={10} className={classes.btn_right}>
            {state.isLoggedIn ? (
              <Button
                className={classes.new_crop_button}
                variant="contained"
                onClick={handleOpen}
              >
                <Typography>+ START NEW CROP</Typography>
              </Button>
            ) : (
              ""
            )}

            <Modal open={open} onClose={handleClose}>
              {body}
            </Modal>
          </Grid>
        </Grid>
        <Grid container className="root landing-bg">
          {/* Active Crops */}
          <Grid container justify="center">
            <Grid item xs={10} className={classes.active_crop_card_container}>
              <Grid container>
                <Grid item xs={12}>
                  <Grid
                    container
                    justify="center"
                    className={classes.active_crop_card_title_button}
                  >
                    <Grid item xs={12}>
                      <Typography
                        variant="h5"
                        className={classes.active_crops_text}
                      >
                        Active Crops
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                {activeCrops.length === 0 ? (
                  <Grid item xs={12} style={{}}>
                    <Carousel
                      renderArrow={myArrow}
                      showArrows={smallScreen ? false : true}
                      itemsToShow={smallScreen ? 1 : 4}
                      enableSwipe
                      renderPagination={({ pages, activePage, onClick }) => {
                        return <></>;
                      }}
                      itemPadding={[0, 10]}
                    >
                      <>
                        <PlaceHolderCropCard
                          key={1}
                          crop_name={"No Active Crop"}
                          pod_name={"HYD-00"}
                          createdAt={"MM/DD/YYYY"}
                        />
                      </>
                    </Carousel>
                  </Grid>
                ) : (
                  <Grid item xs={12}>
                    <Carousel
                      renderArrow={myArrow}
                      showArrows={smallScreen ? false : true}
                      itemsToShow={smallScreen ? 1 : 4}
                      enableSwipe
                      renderPagination={({ pages, activePage, onClick }) => {
                        return <></>;
                      }}
                      itemPadding={[0, 10]}
                    >
                      {activeCrops.map((item, index) => {
                        return (
                          <ActiveCropsCards
                            key={index}
                            crop_name={item.crop_name}
                            pod_name={item.pod_name}
                            createdAt={item.createdAt}
                          />
                        );
                      })}
                    </Carousel>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
          {/* Welcome Section */}
          <Grid container justify="center">
            <Grid item xs={12} md={4} className={classes.lottie_container}>
              <div className={classes.farmer_svg} ref={farmer} />
            </Grid>
            <Grid
              item
              xs={10}
              md={3}
              className={classes.welcome_text_container}
            >
              <Grid
                container
                alignItems="center"
                className={classes.welcome_text}
              >
                <Grid item xs={12}>
                  <Typography variant="h4">
                    Welcome to <b> HYDR&#183;A</b>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Want to access the app on the go?
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    startIcon={<PhoneIphoneIcon />}
                    variant="contained"
                    className={classes.add_to_screen_button}
                    size="large"
                  >
                    ADD TO HOME SCREEN
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={10} md={3} className={classes.quick_help_container}>
              <a href={Pdf} target="_blank" style={{ textDecoration: "none" }}>
                <Grid item xs={12} className={classes.supp_image_tomato}>
                  <Grid container direction="row">
                    <Grid item xs={12}>
                      <Typography
                        variant="h6"
                        className={classes.supp_image_diff_contents_text}
                      >
                        New here?
                      </Typography>
                      <Typography
                        variant="h6"
                        className={
                          classes.supp_image_diff_contents_text_non_bold
                        }
                      >
                        Checkout our guide.
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </a>
            </Grid>
          </Grid>
          {/* Reddit Threads */}
          <Grid container justify="center">
            <Grid item xs={10} className={classes.thread_container}>
              <Typography variant="h6" className={classes.hydro_text}>
                Today on r/hydro
              </Typography>
              <Grid item xs={12}>
                <Grid container className={classes.redditRoot}>
                  <Grid
                    item
                    xs={12}
                    md={3}
                    className={classes.thread_image_container}
                  >
                    <img
                      src={redditBasil}
                      className={classes.thread_image}
                      onClick={() =>
                        window.open(
                          "https://www.reddit.com/r/Hydroponics/comments/okpxe1/first_time_try_basil_i_am_so_happy/",
                          "_blank"
                        )
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={8} className={classes.post_deets}>
                    <Typography
                      variant="body2"
                      className={classes.thread_title}
                      onClick={() =>
                        window.open(
                          "https://www.reddit.com/r/Hydroponics/comments/okpxe1/first_time_try_basil_i_am_so_happy/",
                          "_blank"
                        )
                      }
                    >
                      First time try: basil. I am so happy!
                    </Typography>
                    <Typography
                      color="textSecondary"
                      className={classes.op_deets}
                      onClick={() =>
                        window.open(
                          "https://www.reddit.com/user/KrissieKris/",
                          "_blank"
                        )
                      }
                    >
                      Posted by u/KrissieKris &nbsp;•&nbsp; 12 hours ago
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid container className={classes.redditRoot}>
                  <Grid
                    item
                    xs={12}
                    md={3}
                    className={classes.thread_image_container}
                  >
                    <img
                      src={redditTomatoes}
                      className={classes.thread_image_two}
                      onClick={() =>
                        window.open(
                          "https://www.reddit.com/r/Hydroponics/comments/ok8ux1/4_tomato_varieties_outdoor_dwc_day_41/",
                          "_blank"
                        )
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={8} className={classes.post_deets}>
                    <Typography
                      variant="body2"
                      className={classes.thread_title}
                      onClick={() =>
                        window.open(
                          "https://www.reddit.com/r/Hydroponics/comments/ok8ux1/4_tomato_varieties_outdoor_dwc_day_41/",
                          "_blank"
                        )
                      }
                    >
                      4 Tomato Varieties- Outdoor DWC - Day 41
                    </Typography>
                    <Typography
                      color="textSecondary"
                      className={classes.op_deets}
                      onClick={() =>
                        window.open(
                          "https://www.reddit.com/user/WinterI5Com1ng/",
                          "_blank"
                        )
                      }
                    >
                      Posted by u/WinterI5Com1ng &nbsp;•&nbsp; 18 hours ago
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid container className={classes.redditRoot}>
                  <Grid
                    item
                    xs={12}
                    md={3}
                    className={classes.thread_image_container}
                  >
                    <img
                      src={redditSetup}
                      className={classes.thread_image_two}
                      onClick={() =>
                        window.open(
                          "https://www.reddit.com/r/Hydroponics/comments/ojjye0/long_time_lurker_first_time_op_sharing_my_modest/",
                          "_blank"
                        )
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={8} className={classes.post_deets}>
                    <Typography
                      variant="body2"
                      className={classes.thread_title}
                      onClick={() =>
                        window.open(
                          "https://www.reddit.com/r/Hydroponics/comments/ojjye0/long_time_lurker_first_time_op_sharing_my_modest/",
                          "_blank"
                        )
                      }
                    >
                      Long time lurker, first time OP. Sharing my modest setup.
                    </Typography>
                    <Typography
                      color="textSecondary"
                      className={classes.op_deets}
                      onClick={() =>
                        window.open(
                          "https://www.reddit.com/user/speakerbot/",
                          "_blank"
                        )
                      }
                    >
                      Posted by u/speakerbot &nbsp;•&nbsp; 22 hours ago
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid container justify="flex-end">
                  <Button
                    className={classes.reddit_button}
                    onClick={() =>
                      window.open(
                        "https://www.reddit.com/r/Hydroponics",
                        "_blank"
                      )
                    }
                  >
                    See more on &nbsp;
                    <img
                      src={reddit}
                      style={{ position: "relative", bottom: "2px" }}
                    />
                    &nbsp; ↗
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* Footer */}
          <Grid
            container
            justify="center"
            align="center"
            className={classes.footer_styles}
          >
            <Grid item>
              <img className={classes.hydra_logo} src={circleHydra} />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default LandingPage;
