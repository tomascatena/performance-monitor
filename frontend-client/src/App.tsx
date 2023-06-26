import { Container, Typography } from '@mui/material';
import socketConnection from './socketConnection';

const App = () => {
  socketConnection();

  return (
    <Container>
      <Typography variant="h3">Performance Monitor</Typography>
    </Container>
  );
};

export default App;
