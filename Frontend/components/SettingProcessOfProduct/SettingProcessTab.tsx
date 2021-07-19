import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import SettingProcessParticipant from "./SettingProcessParticipant/SettingProcessParticipant";
import SettingProcessProps from "./SettingProcessProps/SettingProcessProps";
//
interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ width: "100%" }}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={"span"} variant={"body2"}>
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 500,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  React.useEffect(() => {
    if (value === 0) {
      props.callback(a11yProps(value));
    } else {
      props.callback(a11yProps(1));
    }
  }, [value]);

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        // variant="scrollable"
        value={value}
        onChange={handleChange}
        className={classes.tabs}
      >
        <Tab label="Đối tượng" {...a11yProps(0)} />
        <Tab label="Thuộc tính" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <SettingProcessParticipant />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SettingProcessProps />
      </TabPanel>
    </div>
  );
}
