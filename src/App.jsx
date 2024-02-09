import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import ThreeDRotation from "@mui/icons-material/ThreeDRotation";
import HomeIcon from "@mui/icons-material/Home";

import { pink } from "@mui/material/colors";
import Typography from "@mui/material/Typography";

function App() {
  return (
    <>
      <div>trungquandev</div>

      <Typography variant="body2" color="text.secondary">
        Test Typography
      </Typography>
      <Stack spacing={2} direction="row">
        <Button variant="text">Text</Button>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
        <AccessAlarmIcon />
        <ThreeDRotation />
        <HomeIcon />
        <HomeIcon color="primary" />
        <HomeIcon color="secondary" />
        <HomeIcon color="success" />
        <HomeIcon color="action" />
        <HomeIcon color="disabled" />
        <HomeIcon sx={{ color: pink[900] }} />
      </Stack>
    </>
  );
}

export default App;
