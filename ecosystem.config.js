module.exports = {
    apps: {
      name: 'Live Machine App',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      port :  4500 ,
      watch: false,
      max_memory_restart: '1G',
    }
  }