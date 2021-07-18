import React, { useEffect, useRef, useState } from "react";
import LineChart from "../components/LineChart";
import Calendar from "../components/calendar";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Button, Typography } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import SettingsIcon from "@material-ui/icons/Settings";
import { IconButton } from "@material-ui/core";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Slider from "@material-ui/core/Slider";
import Modal from "@material-ui/core/Modal";

//images
import smallTomatoes from "../assets/small_tomatoes.png";
import differentVegetables from "../assets/different_vegetables.jpg";
import FooterWaveImage from "./../assets/footerWave.png";
import wave_header from "./../assets/wave_hedaer.png";
import placeholder_crop from "./../assets/hydra_logo_green.png";
import warning_icon from "./../assets/svg/warning.png";
import green_icon from "./../assets/svg/green_check.png";
import arrow_up from "./../assets/svg/ArrowUp.png";
import arrow_down from "./../assets/svg/ArrowDown.png";
import crop_bg from "./../assets/svg/crop_bg.png";
import leaf from "./../assets/leaf.png";

//Circular Progressbar
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import AnimatedProgressProvider from "../assets/animations/AnimatedProgressProvider";
import "react-circular-progressbar/dist/styles.css";
import { easeQuadInOut } from "d3-ease";

//background image
import "./../components/css/backgroundStyles.css";

// helpers
import { getClientName } from "./../helpers/clientHelpers";

//api
import { loadActiveCrop, harvestCrop } from "./../api/crop";

// icons
import VerticalAlignBottomIcon from "@material-ui/icons/VerticalAlignBottom";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

//api
import { addNewCrop, updateCrop, chartData } from "./../api/crop";

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
    marginTop: "10vh",
    "@media (max-width: 768px)": {
      marginTop: "10vh",
    },
  },
  wave_bg: {
    backgroundImage: `url(${wave_header})`,
  },
  hide_for_desc_mob: {
    "@media (max-width: 768px)": {
      display: "none",
    },
  },
  header_iamge: {
    width: "100%",
    height: "100%",
  },
  supp_image_diff: {
    width: "33%",
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
    width: "33%",
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
    textAlign: "right",
    color: "#2e604a",
    fontWeight: "light",
    display: "flex",
    justifyContent: "flex-end",
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
    marginTop: "10px",
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "10px",
    paddingBottom: "10px",
    paddingTop: "10px",
  },
  divider_right: {
    borderRight: "1px solid silver	",
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
}));

function CropsPage() {
  const classes = useStyles();
  const history = useHistory();
  const red = 50;
  const pod_name = history.location.state.data;
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    active: false,
    createdAt: "",
    cropName: "",
    healthy: true,
    pod_name: "",
    temp: "",
    temp_inc: "",
    temp_normal: false,
    humid: "",
    humid_inc: "",
    humid_normal: false,
    ph_level: "",
    conductivity: "",
    conductivity_inc: "",
    conductivity_normal: "",
    ph_level_inc: "",
    ph_level_normal: "",
    nutrientA: "",
    nutrientB: "",
    nutrientC: "",
    ph_down: "",
    ph_up: "",
    water_temp: "",
    water_level: "",
    temperature_threshold_max: "",
    temperature_threshold_min: "",
    conductivity_threshold_min: "",
    conductivity_threshold_max: "",
    humidity_threshold_min: "",
    humidity_threshold_max: "",
    ph_level_threshold_min: "",
    ph_level_threshold_max: "",
    vpd: "",
    vpd_normal: "",
    vpd_inc: "",
    _id: "",
  });
  const [chart, setChart] = useState([]);

  // reload 5 secs

  // sets value for crop name
  const [value, setValue] = React.useState(null);
  // sets value for podname
  const [podName, setPodName] = React.useState(null);
  // store crops here after loading from api
  const [cropsList, setCropList] = useState([]);
  const [podsList, setPodsList] = useState([]);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  // state for images
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  // state for active crops
  const [activeCrops, setActiveCrops] = useState([]);

  const handleChanges = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  // for slider
  const handleTempChange = (event, newValue) => {
    //setTemp(newValue);
    setState({
      ...state,
      temperature_threshold_min: newValue[0],
      temperature_threshold_max: newValue[1],
    });
  };

  const handleHumidChange = (event, newValue) => {
    setState({
      ...state,
      humidity_threshold_min: newValue[0],
      humidity_threshold_max: newValue[1],
    });
  };
  const handleEcChange = (event, newValue) => {
    setState({
      ...state,
      conductivity_threshold_min: newValue[0],
      conductivity_threshold_max: newValue[1],
    });
  };
  const handlePhChange = (event, newValue) => {
    setState({
      ...state,
      ph_level_threshold_min: newValue[0],
      ph_level_threshold_max: newValue[1],
    });
  };
  function valuetext(value) {
    return `${value}°C`;
  }

  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    loadActiveCrop(pod_name, (callback) => {
      console.log(callback);
      console.log(
        callback.data.threshold_values.conductivity.max.$numberDecimal
      );
      if (callback.status === 200) {
        setState({
          ...state,
          active: callback.data.active,
          createdAt: callback.data.createdAt,
          cropName: callback.data.crop_name,
          healthy: callback.data.healthy,
          pod_name: callback.data.pod_name,
          // EC
          conductivity:
            callback.data.latest_data.conductivity.value.$numberDecimal,
          conductivity_inc: callback.data.latest_data.conductivity.increase,
          conductivity_normal: callback.data.latest_data.conductivity.normal,
          // Temp
          temp: callback.data.latest_data.air_temperature.value.$numberDecimal,
          temp_inc: callback.data.latest_data.air_temperature.increase,
          temp_normal: callback.data.latest_data.air_temperature.normal,
          // Humid
          humid_inc: callback.data.latest_data.humidity.increase,
          humid_normal: callback.data.latest_data.humidity.normal,
          humid: callback.data.latest_data.humidity.value.$numberDecimal,
          // ph
          ph_level: callback.data.latest_data.ph_level.value.$numberDecimal,
          ph_level_inc: callback.data.latest_data.ph_level.increase,
          ph_level_normal: callback.data.latest_data.ph_level.normal,
          // nutrients
          nutrientA: callback.data.latest_data.nutrient_A.value,
          nutrientB: callback.data.latest_data.nutrient_B.value,
          nutrientC: callback.data.latest_data.nutrient_C.value,
          // ph up & down
          ph_up: callback.data.latest_data.ph_up.value,
          ph_down: callback.data.latest_data.ph_down.value,
          // water
          water_temp:
            callback.data.latest_data.water_temperature.value.$numberDecimal,
          water_level: callback.data.latest_data.water_level.value,
          // thresholds
          // temp
          temperature_threshold_max:
            callback.data.threshold_values.air_temperature.max.$numberDecimal,
          temperature_threshold_min:
            callback.data.threshold_values.air_temperature.min.$numberDecimal,
          // conduct
          conductivity_threshold_max:
            callback.data.threshold_values.conductivity.max.$numberDecimal,
          conductivity_threshold_min:
            callback.data.threshold_values.conductivity.min.$numberDecimal,

          // humidity
          humidity_threshold_min:
            callback.data.threshold_values.humidity.min.$numberDecimal,
          humidity_threshold_max:
            callback.data.threshold_values.humidity.max.$numberDecimal,
          // phlevl
          ph_level_threshold_min:
            callback.data.threshold_values.ph_level.min.$numberDecimal,
          ph_level_threshold_max:
            callback.data.threshold_values.ph_level.max.$numberDecimal,
          //vpd
          vpd: callback.data.latest_data.vpd.value.$numberDecimal,
          vpd_normal: callback.data.latest_data.vpd.normal,
          vpd_inc: callback.data.latest_data.vpd.increase,
          // crop id
          _id: callback.data._id,
        });
      }
    });
  }, []);

  //gets chart data
  useEffect(() => {
    let data = {
      crop_id: state._id,
    };
    chartData(data, (callback) => {
      console.log(callback);
      //console.log(callback.data.datasets);

      setChart(callback.data);
    });
  }, [state._id]);

  // for modal
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // for autocomplete field
  const filter = createFilterOptions();

  const harvestActiveCrop = () => {
    //const data = state.pod_name;
    let data = {
      pod_name: state.pod_name,
      active: state.active,
    };
    harvestCrop(data, (callback) => {
      console.log(callback);
      console.log("Crop Harvested!");
      history.push("/home");
    });
  };

  // on start new crop submit
  const onUpdateCrop = () => {
    const podName = state.pod_name;
    let data = {
      tempStart: state.temperature_threshold_min,
      tempEnd: state.temperature_threshold_max,
      humidityStart: state.humidity_threshold_min,
      humidityEnd: state.humidity_threshold_max,
      conductivityStart: state.conductivity_threshold_min,
      conductivityEnd: state.conductivity_threshold_max,
      phStart: state.ph_level_threshold_min,
      phEnd: state.ph_level_threshold_max,
      cropName: state.cropName,
    };

    updateCrop(data, podName, (callback) => {
      console.log(callback);
      if (callback.status === 201) {
        console.log("Crop Updated");
      }
    });
    setOpen(false);
    window.location.reload();
  };

  // Items inside modal
  const body = (
    <div className={classes.modal}>
      <Typography className={classes.hydro_text}> Crop Settings</Typography>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          onUpdateCrop();
        }}
      >
        <Grid container className={classes.hide_for_desc_mob}>
          <Grid item xs={10}>
            <Typography color="textSecondary" className={classes.new_crop_desc}>
              Feel free to update the threshold values for the crop! Changes
              should take effect shortly. This will not change the default
              preset settings.
            </Typography>
          </Grid>
          <Grid
            item
            xs={2}
            style={{ display: "flex", justifyContent: "flex-end" }}
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
            <Typography
              onClick={() =>
                console.log(
                  state.temperature_threshold_min,
                  state.temperature_threshold_max
                )
              }
            >
              <b>Crop Name</b>
            </Typography>
            <Typography
              style={{
                padding: 15,
                borderRadius: 4,
                border: "1px solid silver",
              }}
            >
              {state.cropName}
            </Typography>
          </Grid>
          {/* POD NAME */}
          <Grid item xs={12} md={6}>
            <Typography>
              <b>Setup Name</b>
            </Typography>
            <Typography
              style={{
                padding: 15,
                borderRadius: 4,
                border: "1px solid silver",
              }}
            >
              {state.pod_name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography id="range-slider" gutterBottom>
              Temperature Threshold (°C)
            </Typography>
            <Slider
              value={[
                state.temperature_threshold_min,
                state.temperature_threshold_max,
              ]}
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
                {state.temperature_threshold_min}
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
                {state.temperature_threshold_max}
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
              value={[
                state.humidity_threshold_min,
                state.humidity_threshold_max,
              ]}
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
                {state.humidity_threshold_min}
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
                {state.humidity_threshold_min}
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
              value={[
                state.conductivity_threshold_min,
                state.conductivity_threshold_max,
              ]}
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
                {state.conductivity_threshold_min}
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
                {state.conductivity_threshold_max}
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
              value={[
                state.ph_level_threshold_min,
                state.ph_level_threshold_max,
              ]}
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
                {state.ph_level_threshold_min}
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
                {state.ph_level_threshold_max}
              </Typography>
            </div>
          </Grid>

          <Grid container>
            <Grid item xs={5}></Grid>
            <Grid
              item
              xs={7}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button className={classes.back_btn_modal} onClick={handleClose}>
                Back
              </Button>
              <Button
                type="submit"
                className={classes.save_btn_modal}
                // onClick={() =>
                //   console.log(
                //     state.temperature_threshold_min,
                //     state.temperature_threshold_max
                //   )
                // }
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );

  return (
    <div className={classes.root}>
      <Grid container justify="center">
        <Grid
          item
          container
          md={10}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: "5vh",
            borderTopRightRadius: 10,
            backgroundImage: smallScreen ? "" : `url(${crop_bg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "top",
          }}
        >
          <Grid
            container
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 20,
              marginRight: 20,
            }}
          >
            <Grid item>
              <IconButton onClick={handleOpen}>
                <SettingsIcon />
              </IconButton>
            </Grid>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              {body}
            </Modal>
          </Grid>
          <Grid
            item
            container
            md={12}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              borderTopRightRadius: 10,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "top",
            }}
          >
            <Grid item xs={12} md={2}>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={placeholder_crop}
                    style={{
                      height: 80,
                      padding: 20,
                      borderRadius: "50%",
                      border: "5px solid #59b74f",
                    }}
                  />
                </div>
                <Typography
                  onClick={() => console.log(state.active)}
                  style={{
                    textAlign: "center",
                    fontSize: 12,
                    marginTop: 10,
                    marginBottom: 5,
                  }}
                >
                  {state.pod_name}
                </Typography>
                <Typography
                  onClick={() => console.log(state.active)}
                  style={{ textAlign: "center", fontWeight: "bold" }}
                >
                  {state.cropName}
                </Typography>
                <Button
                  style={{
                    fontSize: 12,
                    backgroundColor: "#376e57",
                    color: "white",
                    marginTop: 10,
                    marginLeft: smallScreen ? "25%" : "10%",
                    marginRight: smallScreen ? "25%" : "10%",
                    borderRadius: 50,
                    padding: 4,
                  }}
                  onClick={() => harvestActiveCrop()}
                >
                  Harvest Now
                </Button>
              </div>
            </Grid>
            {/* temp */}
            <Grid
              item
              xs={12}
              md={2}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginRight: 5,
                }}
              >
                {state.temp_inc === 0 ? (
                  <img src={arrow_up} style={{ width: 10, marginTop: 20 }} />
                ) : (
                  <img src={arrow_down} style={{ width: 10, marginTop: 20 }} />
                )}
                {state.temp_normal === true ? (
                  <img src={green_icon} style={{ width: 14, marginTop: 10 }} />
                ) : (
                  <img
                    src={warning_icon}
                    style={{ width: 14, marginTop: 10 }}
                  />
                )}
              </div>
              <div
                style={{ marginTop: 20, width: smallScreen ? "25%" : "60%" }}
              >
                <Typography
                  style={{
                    fontSize: 12,
                    fontWeight: "regular",
                    textAlign: "right",
                  }}
                >
                  ℃
                  {/* <sup style={{ fontSize: 12, fontWeight: "regular" }}> ℃ </sup> */}
                </Typography>
                <Typography
                  style={{
                    textAlign: "center",
                    fontSize: 42,
                    fontWeight: "bold",
                  }}
                >
                  {state.temp}
                  {/* <sup style={{ fontSize: 12, fontWeight: "regular" }}> ℃ </sup> */}
                </Typography>
                <Typography
                  onClick={() => console.log(state.active)}
                  style={{
                    textAlign: "center",
                  }}
                >
                  Temperature
                </Typography>
              </div>
            </Grid>
            {/* humidity */}
            <Grid
              item
              xs={12}
              md={2}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginRight: 5,
                }}
              >
                {state.humid_inc === 0 ? (
                  <img src={arrow_up} style={{ width: 10, marginTop: 20 }} />
                ) : (
                  <img src={arrow_down} style={{ width: 10, marginTop: 20 }} />
                )}
                {state.humid_normal === true ? (
                  <img src={green_icon} style={{ width: 14, marginTop: 10 }} />
                ) : (
                  <img
                    src={warning_icon}
                    style={{ width: 14, marginTop: 10 }}
                  />
                )}
              </div>
              <div
                style={{ marginTop: 20, width: smallScreen ? "25%" : "60%" }}
              >
                <Typography
                  style={{
                    fontSize: 12,
                    fontWeight: "regular",
                    textAlign: "right",
                  }}
                >
                  %
                </Typography>
                <Typography
                  style={{
                    textAlign: "center",
                    fontSize: 42,
                    fontWeight: "bold",
                  }}
                >
                  {parseFloat(state.humid).toFixed(2)}
                </Typography>
                <Typography
                  onClick={() => console.log(state.active)}
                  style={{
                    textAlign: "center",
                  }}
                >
                  Humidity
                </Typography>
              </div>
            </Grid>
            {/* conductivity */}
            <Grid
              item
              xs={12}
              md={2}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginRight: 5,
                }}
              >
                {state.conductivity_normal === true ? (
                  <img src={green_icon} style={{ width: 14, marginTop: 50 }} />
                ) : (
                  <img
                    src={warning_icon}
                    style={{ width: 14, marginTop: 50 }}
                  />
                )}
              </div>
              <div
                style={{ marginTop: 20, width: smallScreen ? "25%" : "60%" }}
              >
                <Typography
                  style={{
                    fontSize: 12,
                    fontWeight: "regular",
                    textAlign: "right",
                  }}
                >
                  mS/cm
                </Typography>
                <Typography
                  style={{
                    textAlign: "center",
                    fontSize: 42,
                    fontWeight: "bold",
                  }}
                >
                  {parseFloat(state.conductivity).toFixed(2)}
                </Typography>
                <Typography
                  onClick={() => console.log(state.active)}
                  style={{
                    textAlign: "center",
                  }}
                >
                  EC
                </Typography>
              </div>
            </Grid>
            {/* VPD */}
            <Grid
              item
              xs={12}
              md={2}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginRight: 5,
                }}
              >
                {state.vpd_inc === 0 ? (
                  <img src={arrow_up} style={{ width: 10, marginTop: 20 }} />
                ) : (
                  <img src={arrow_down} style={{ width: 10, marginTop: 20 }} />
                )}
                {state.vpd_normal === true ? (
                  <img src={green_icon} style={{ width: 14, marginTop: 10 }} />
                ) : (
                  <img
                    src={warning_icon}
                    style={{ width: 14, marginTop: 10 }}
                  />
                )}
              </div>
              <div
                style={{ marginTop: 20, width: smallScreen ? "25%" : "60%" }}
              >
                <Typography
                  style={{
                    fontSize: 12,
                    fontWeight: "regular",
                    textAlign: "right",
                  }}
                >
                  kPa
                </Typography>
                <Typography
                  style={{
                    textAlign: "center",
                    fontSize: 42,
                    fontWeight: "bold",
                  }}
                >
                  {parseFloat(state.vpd).toFixed(2)}
                </Typography>
                <Typography
                  onClick={() => console.log(state.active)}
                  style={{
                    textAlign: "center",
                  }}
                >
                  VPD
                </Typography>
              </div>
            </Grid>
            {/* pH */}
            <Grid
              item
              xs={12}
              md={2}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginRight: 5,
                }}
              >
                {state.ph_level_normal === true ? (
                  <img src={green_icon} style={{ width: 14, marginTop: 50 }} />
                ) : (
                  <img
                    src={warning_icon}
                    style={{ width: 14, marginTop: 50 }}
                  />
                )}
              </div>
              <div
                style={{ marginTop: 20, width: smallScreen ? "25%" : "60%" }}
              >
                <Typography
                  style={{
                    fontSize: 12,
                    fontWeight: "regular",
                    textAlign: "right",
                  }}
                >
                  pH
                  {/* <sup style={{ fontSize: 12, fontWeight: "regular" }}> ℃ </sup> */}
                </Typography>
                <Typography
                  style={{
                    textAlign: "center",
                    fontSize: 42,
                    fontWeight: "bold",
                  }}
                >
                  {parseFloat(state.ph_level).toFixed(2)}
                  {/* <sup style={{ fontSize: 12, fontWeight: "regular" }}> ℃ </sup> */}
                </Typography>
                <Typography
                  onClick={() => console.log(state.active)}
                  style={{
                    textAlign: "center",
                  }}
                >
                  Acidity
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container justify="center">
        <Grid item xs={8}>
          <Typography
            className={classes.hydro_text}
            variant="h5"
            style={{
              marginTop: smallScreen ? 50 : 20,
              textAlign: smallScreen ? "center" : "right",
            }}
            onClick={() => console.log(state._id)}
          >
            Threshold Monitor
          </Typography>
        </Grid>

        <Grid item xs={8} className={classes.progressbar_container}>
          <Grid container spacing={3}>
            {/* <Grid item xs={12}>
              <Typography className={classes.hydro_text} variant="h5">
                Threshold Monitor
              </Typography>
            </Grid> */}

            <Grid item xs={12} md={2} className={classes.divider_right}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <AnimatedProgressProvider
                    valueStart={0}
                    valueEnd={state.water_level}
                    duration={2}
                    easingFunction={easeQuadInOut}
                  >
                    {(value) => {
                      const roundedValue = Math.round(value);
                      return (
                        <>
                          <CircularProgressbar
                            value={value}
                            text={`${roundedValue}%`}
                            circleRatio={0.75}
                            styles={buildStyles({
                              rotation: 1 / 2 + 1 / 8,
                              strokeLinecap: "butt",
                              trailColor: "#eee",
                              pathTransition: "none",
                              textColor: value < red ? "red" : "#59b74f",
                              trailColor: "#d6d6d6",
                              pathColor: value < red ? "red" : "#59b74f",
                            })}
                          />
                          <Typography
                            style={{
                              textAlign: "center",
                              transform: smallScreen
                                ? "translateY(-200%)"
                                : "translateY(-230%)",
                              fontSize: smallScreen ? 16 : 10,
                            }}
                          >
                            {parseFloat(state.water_temp).toFixed(2)} ℃
                          </Typography>
                        </>
                      );
                    }}
                  </AnimatedProgressProvider>
                </Grid>
                <Grid item xs={12}>
                  <Typography align="center">Water</Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={4} className={classes.divider_right}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <AnimatedProgressProvider
                    valueStart={0}
                    valueEnd={state.ph_up}
                    duration={2}
                    easingFunction={easeQuadInOut}
                  >
                    {(value) => {
                      const roundedValue = Math.round(value);
                      return (
                        <>
                          <CircularProgressbar
                            value={value}
                            text={`${roundedValue}%`}
                            circleRatio={0.75}
                            styles={buildStyles({
                              rotation: 1 / 2 + 1 / 8,
                              strokeLinecap: "butt",
                              trailColor: "#eee",
                              pathTransition: "none",
                              textColor: value < red ? "red" : "#59b74f",
                              trailColor: "#d6d6d6",
                              pathColor: value < red ? "red" : "#59b74f",
                            })}
                          />
                          <Typography
                            style={{
                              textAlign: "center",
                              transform: smallScreen
                                ? "translateY(-200%)"
                                : "translateY(-230%)",
                              fontSize: smallScreen ? 16 : 10,
                            }}
                          >
                            pH Up
                          </Typography>
                        </>
                      );
                    }}
                  </AnimatedProgressProvider>
                </Grid>
                <Grid item xs={12} md={6}>
                  <AnimatedProgressProvider
                    valueStart={0}
                    valueEnd={state.ph_down}
                    duration={2}
                    easingFunction={easeQuadInOut}
                  >
                    {(value) => {
                      const roundedValue = Math.round(value);
                      return (
                        <>
                          <CircularProgressbar
                            value={value}
                            text={`${roundedValue}%`}
                            circleRatio={0.75}
                            styles={buildStyles({
                              rotation: 1 / 2 + 1 / 8,
                              strokeLinecap: "butt",
                              trailColor: "#eee",
                              pathTransition: "none",
                              textColor: value < red ? "red" : "#59b74f",
                              trailColor: "#d6d6d6",
                              pathColor: value < red ? "red" : "#59b74f",
                            })}
                          />
                          <Typography
                            style={{
                              textAlign: "center",
                              transform: smallScreen
                                ? "translateY(-200%)"
                                : "translateY(-230%)",
                              fontSize: smallScreen ? 16 : 10,
                            }}
                          >
                            pH down
                          </Typography>
                        </>
                      );
                    }}
                  </AnimatedProgressProvider>
                </Grid>
                <Grid item xs={12}>
                  <Typography align="center">pH Buffer</Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <AnimatedProgressProvider
                    valueStart={0}
                    valueEnd={state.nutrientA}
                    duration={2}
                    easingFunction={easeQuadInOut}
                  >
                    {(value) => {
                      const roundedValue = Math.round(value);
                      return (
                        <>
                          <CircularProgressbar
                            value={value}
                            text={`${roundedValue}% `}
                            circleRatio={0.75}
                            styles={buildStyles({
                              rotation: 1 / 2 + 1 / 8,
                              strokeLinecap: "butt",
                              trailColor: "#eee",
                              pathTransition: "none",
                              textColor: value < red ? "red" : "#59b74f",
                              trailColor: "#d6d6d6",
                              pathColor: value < red ? "red" : "#59b74f",
                            })}
                          />
                          <Typography
                            style={{
                              textAlign: "center",
                              transform: smallScreen
                                ? "translateY(-200%)"
                                : "translateY(-230%)",
                              fontSize: smallScreen ? 16 : 10,
                            }}
                          >
                            A
                          </Typography>
                        </>
                      );
                    }}
                  </AnimatedProgressProvider>
                </Grid>
                <Grid item xs={12} md={4}>
                  <AnimatedProgressProvider
                    valueStart={0}
                    valueEnd={state.nutrientB}
                    duration={2}
                    easingFunction={easeQuadInOut}
                  >
                    {(value) => {
                      const roundedValue = Math.round(value);
                      return (
                        <>
                          <CircularProgressbar
                            value={value}
                            text={`${roundedValue}%`}
                            circleRatio={0.75}
                            styles={buildStyles({
                              rotation: 1 / 2 + 1 / 8,
                              strokeLinecap: "butt",
                              trailColor: "#eee",
                              pathTransition: "none",
                              textColor: value < red ? "red" : "#59b74f",
                              trailColor: "#d6d6d6",
                              pathColor: value < red ? "red" : "#59b74f",
                            })}
                          />
                          <Typography
                            style={{
                              textAlign: "center",
                              transform: smallScreen
                                ? "translateY(-200%)"
                                : "translateY(-230%)",
                              fontSize: smallScreen ? 16 : 10,
                            }}
                          >
                            B
                          </Typography>
                        </>
                      );
                    }}
                  </AnimatedProgressProvider>
                </Grid>
                <Grid item xs={12} md={4}>
                  <AnimatedProgressProvider
                    valueStart={0}
                    valueEnd={state.nutrientC}
                    duration={2}
                    easingFunction={easeQuadInOut}
                  >
                    {(value) => {
                      const roundedValue = Math.round(value);
                      return (
                        <>
                          <CircularProgressbar
                            value={value}
                            text={`${roundedValue}%`}
                            circleRatio={0.75}
                            styles={buildStyles({
                              rotation: 1 / 2 + 1 / 8,
                              strokeLinecap: "butt",
                              trailColor: "#eee",
                              pathTransition: "none",
                              textColor: value < red ? "red" : "#59b74f",
                              trailColor: "#d6d6d6",
                              pathColor: value < red ? "red" : "#59b74f",
                            })}
                          />
                          <Typography
                            style={{
                              textAlign: "center",
                              transform: smallScreen
                                ? "translateY(-200%)"
                                : "translateY(-230%)",
                              fontSize: smallScreen ? 16 : 10,
                            }}
                          >
                            C
                          </Typography>
                        </>
                      );
                    }}
                  </AnimatedProgressProvider>
                </Grid>

                <Grid item xs={12}>
                  <Typography align="center">Nutrient Solution</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          className="cropsPage"
          style={{
            overflow: "hidden",
            margin: 10,
          }}
        >
          <div className="chart">
            <LineChart data={chart} />
          </div>
        </Grid>
        <Grid
          container
          className="cropsPage"
          style={{ overflow: "hidden", margin: 10 }}
        >
          <div className="calendar">
            <Calendar />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
export default CropsPage;
