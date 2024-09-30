import 'dotenv/config.js';
import app from './src/app.js';

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Auth server listening at: http://localhost:${PORT}`);
});
