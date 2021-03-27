type MicroUiLogger = {
  info: (...args: any) => void;
  warn: (...args: any) => void;
  error: (...args: any) => void;
  debug: (...args: any) => void;
};

export default MicroUiLogger;
