import 'dotenv/config';
import app from '../app.js';
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server listen in: http://localhost:${PORT}`);
});