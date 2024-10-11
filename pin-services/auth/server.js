import 'dotenv/config.js';
import app from './src/app.js';
import cluster from 'cluster';
import * as os from "node:os";

const CPUs = os.cpus().length;

if(cluster.isMaster){
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i< CPUs; i++){
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} offline!`);
    cluster.fork();
  })
}else{
  const PORT = 5000;

  app.listen(PORT, () => {
    console.log(`Auth server listening at: http://localhost:${PORT}`);
  });
}


