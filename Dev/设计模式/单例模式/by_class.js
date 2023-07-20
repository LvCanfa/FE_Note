class Logger {
    constructor() {
      if (!Logger.instance) {
        this.logs = [];
        Logger.instance = this;
      }
  
      return Logger.instance;
    }
  
    log(message) {
      this.logs.push(message);
      console.log(`Logger: ${message}`);
    }
  
    printLogCount() {
      console.log(`Number of logs: ${this.logs.length}`);
    }
  }
  
  // 可以使用全局变量来访问实例
  const logger = new Logger();
  Object.freeze(logger);
  
  // 对于每个实例，输出应该是相同的
  logger.log('First message'); // Output: Logger: First message
  logger.printLogCount(); // Output: Number of logs: 1
  
  const anotherLogger = new Logger(); // 此时返回一个已经存在的实例
  anotherLogger.log('Second message'); // Output: Logger: Second message
  anotherLogger.printLogCount(); // Output: Number of logs: 2
  