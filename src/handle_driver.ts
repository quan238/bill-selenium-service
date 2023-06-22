import { ChromiumWebDriver } from 'selenium-webdriver';
import { startDriver } from './driver';

export async function handleDriver(index: number, changeIP: boolean, callBack: (driver: ChromiumWebDriver, index: number) => void): Promise<void> {
  try {
    const driver: ChromiumWebDriver = await startDriver(index);
    // await handleOpenConfigNopecha(driver)

    try {
      await driver
        .getAllWindowHandles()
        .then((handles) => {
          const promises = handles.map(async (handle) => {
            await driver.switchTo().window(handle);
            await driver.executeScript('return document.readyState').then((readyState) => {
              return readyState === 'complete';
            });
          });
          return Promise.all(promises);
        })
        .then((_) => {
          console.log('done');
        });

      await callBack(driver, index);

      // @note: quit driver. Comment because we need to check result
      await driver.quit();
    } catch (error) {
      await driver.quit();
      throw new Error('error: ' + error);
    }
  } catch (error) {
    throw new Error('error: ' + error);
  }
}
