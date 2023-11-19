import * as core from '@actions/core';
import { chromium } from 'playwright';

const URL = 'https://store.sony.co.kr/product-view/114077335';
// const URL = 'https://store.sony.co.kr/product-view/102263891';

// const SUCCESS_TEXT = '바로 구매하기';;
const FAIL_TEXT = '일시품절';

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1512, height: 827 });

  await page.goto(URL);

  const purchaseButtonText = await page.textContent(
    '.cont > .result_btn_inner > .result_btn_box > ul > .final',
  );
  const isPurchaseAvailable = FAIL_TEXT !== purchaseButtonText;

  core.debug(`purchaseButtonText: ${purchaseButtonText}`);
  core.debug(`isPurchaseAvailable: ${isPurchaseAvailable}`);

  core.setOutput('isPurchaseAvailable', isPurchaseAvailable);

  await browser.close();
}

run();
