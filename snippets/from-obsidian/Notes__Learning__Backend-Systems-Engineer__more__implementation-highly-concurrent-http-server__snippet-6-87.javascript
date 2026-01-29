const cluster = require('cluster');
const os = require('os');
const express = require('express');

if (cluster.isMaster) {
  console.log(`📊 Master ${process.pid} is running`);
  
  // Create workers = CPU cores
  const numCPUs = os.cpus().length;
  console.log(`🚀 Launching ${numCPUs} workers...`);
  
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  // Handle worker events
  cluster.on('exit', (worker, code, signal) => {
    console.log(`💀 Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork(); // Auto-restart
  });
  
  cluster.on('online', (worker) => {
    console.log(`✅ Worker ${worker.process.pid} is online`);
  });
  
} else {
  // Worker process - runs Express server
  const app = express();
  const PORT = 3000;
  
  // Middleware
  app.use(express.json());
  
  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({
      status: 'healthy',
      worker: process.pid,
      uptime: process.uptime()
    });
  });
  
  // Simulate CPU-intensive task
  app.get('/compute', (req, res) => {
    let result = 0;
    for (let i = 0; i < 10000000; i++) {
      result += Math.sqrt(i); // CPU-intensive operation
    }
    res.json({
      result: result,
      worker: process.pid,
      computedIn: `${process.hrtime()[1] / 1000000}ms`
    });
  });
  
  // Simple API endpoint
  app.get('/api/data', (req, res) => {
    res.json({
      message: 'Hello from clustered server!',
      workerId: process.pid,
      timestamp: new Date().toISOString()
    });
  });
  
  // Load test endpoint
  app.get('/stress', async (req, res) => {
    // Simulate database/API call
    await new Promise(resolve => setTimeout(resolve, 100));
    res.json({
      worker: process.pid,
      memory: process.memoryUsage(),
      requestCount: Math.floor(Math.random() * 1000)
    });
  });
  
  // Start server
  app.listen(PORT, () => {
    console.log(`👷 Worker ${process.pid} listening on port ${PORT}`);
  });
}