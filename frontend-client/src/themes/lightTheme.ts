import { breakpoints } from './baseTheme/breakpoints';
import { createTheme } from '@mui/material/styles';
import { lightPalette } from './palettes/lightPalette';
import { mixins } from './baseTheme/mixins';
import { shadows } from './baseTheme/shadows';
import { shape } from './baseTheme/shape';
import { transitions } from './baseTheme/transitions';
import { typography } from './baseTheme/typography';
import { zIndex } from './baseTheme/zIndex';

const darkTheme = createTheme({
  breakpoints,
  direction: `ltr`,
  components: {},
  palette: lightPalette,
  shape,
  mixins,
  shadows,
  typography,
  transitions,
  zIndex,
});

export default darkTheme;
