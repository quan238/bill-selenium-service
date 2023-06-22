import { IConfig } from '../interfaces';
import logger from '../logger';

const CONFIG: IConfig = {
  portablePath: process.env.PORTABLE_PATH || '',
};

// check config
const checkConfig = (envProperties: (keyof IConfig)[]) => {
  for (const property of envProperties) {
    if (!CONFIG[property]) {
      logger.error(`Missing config: ${property}`);
      throw new Error(`Missing config: ${property}`);
    }
  }
};

checkConfig([]);

export default CONFIG;
