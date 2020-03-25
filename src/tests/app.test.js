const puppeteer = require('puppeteer');
require('babel-polyfill')

let baseUrl = 'http://localhost:3006';
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const performRegister = async (page) => {
  await page.click("input[id=username]");
  await page.type("input[id=username]", "realUser");
  await page.click("input[id=name]");
  await page.type("input[id=name]", "realUser");
  await page.click("input[id=email]");
  await page.type("input[id=email]", "realUser@rice.edu");
  await page.click("input[id=phone]");
  await page.type("input[id=phone]", "123-123-1230");
  await page.click("input[id=zipcode]");
  await page.type("input[id=zipcode]", "77005");
  await page.click("input[id=birthday]");
  await page.type("input[id=birthday]", "11111970");
  await page.click("input[id=password]");
  await page.type("input[id=password]", "123");
  await page.click("input[id=confirmPassword]");
  await page.type("input[id=confirmPassword]", "123");
  await page.click(".registerSubmit");
}

const performLogin = async (page, username='realUser', password='123') => {
  await page.click('input#loginUsername');
  await page.type('input#loginUsername', username);
  await page.click('input#loginPassword');
  await page.type('input#loginPassword', password);
  await page.click('.loginSubmit');
}

describe('test landing page', () => {
  it('test Register a new user named "realUser"', async () => {
    let browser = await puppeteer.launch({
      headless: false
    });
    let page = await browser.newPage();
    page.emulate({
      viewport: {
        width: 1000,
        height: 2400
      },
      userAgent: ''
    });
    await page.goto(baseUrl);
    await performRegister(page);
    await timeout(2000);
    expect(page.url()).toBe(baseUrl + "/main");
    browser.close();
  }, 10000);

  it('test Log in as "realUser"', async () => {
    let browser = await puppeteer.launch({
      headless: false
    });
    let page = await browser.newPage();
    page.emulate({
      viewport: {
        width: 1000,
        height: 2400
      },
      userAgent: ''
    });
    await page.goto(baseUrl);
    await performLogin(page);
    await timeout(2000);
    expect(page.url()).toBe(baseUrl + "/main");
    browser.close();
  }, 10000);
})

describe('test main page', () => {
  it('test create a new article validate the article appears in the feed', async () => {
    let browser = await puppeteer.launch({
      headless: false
    });
    let page = await browser.newPage();
    page.emulate({
      viewport: {
        width: 1000,
        height: 2400
      },
      userAgent: ''
    });
    await page.goto(baseUrl);
    await performLogin(page);
    await timeout(2000);
    await page.click('.newArticleTextarea');
    await page.type('.newArticleTextarea', 'test article body');
    await page.click('.newArticlePost');
    await timeout(1000);
    const html = await page.$eval('.my-card:nth-of-type(0n+1) .card-text:nth-of-type(0n+2)', e => e.innerHTML);
    expect(html).toBe('test article body');
    browser.close();
  }, 10000);
  it('test Update the status headline and verify the change', async () => {
    let browser = await puppeteer.launch({
      headless: false
    });
    let page = await browser.newPage();
    page.emulate({
      viewport: {
        width: 1000,
        height: 2400
      },
      userAgent: ''
    });
    await page.goto(baseUrl);
    await performLogin(page);
    await timeout(2000);
    await page.click('.newStatusInput');
    await page.type('.newStatusInput', 'new status happy');
    await page.click('.changeStatusBtn');
    await timeout(1000);
    const html = await page.$eval('.userStatus', e => e.innerHTML);
    expect(html).toBe('new status happy');
    browser.close();
  }, 10000);
  it('test Log out "realUser"', async () => {
    let browser = await puppeteer.launch({
      headless: false
    });
    let page = await browser.newPage();
    page.emulate({
      viewport: {
        width: 1000,
        height: 2400
      },
      userAgent: ''
    });
    await page.goto(baseUrl);
    await performLogin(page);
    await timeout(2000);
    await page.click('.userLogout');
    await timeout(1000);
    expect(page.url() === baseUrl || page.url() === baseUrl + '/').toBeTruthy();
    browser.close();
  }, 10000);
});

describe('test Log in as test user', () => {
  it('test Register a new user named "realUser"', async () => {
    let browser = await puppeteer.launch({
      headless: false
    });
    let page = await browser.newPage();
    page.emulate({
      viewport: {
        width: 1000,
        height: 2400
      },
      userAgent: ''
    });
    await page.goto(baseUrl);
    await performLogin(page, 'yw90', '123');
    await timeout(2000);
    expect(page.url()).toBe(baseUrl + "/main");
    browser.close();
  }, 10000);
  it('test Search for a keyword that matches only one of test user\'s articles', async () => {
    let browser = await puppeteer.launch({
      headless: false
    });
    let page = await browser.newPage();
    page.emulate({
      viewport: {
        width: 1000,
        height: 2400
      },
      userAgent: ''
    });
    await page.goto(baseUrl);
    await performLogin(page, 'yw90', '123');
    await timeout(2000);
    await page.click('.articleKeyword');
    await page.type('.articleKeyword', 'test user only text 5');
    const html = await page.$eval('.my-card:nth-of-type(0n+1) .card-text:nth-of-type(0n+2)', e => e.innerHTML);
    expect(html).toBe('test user only text 5');
    browser.close();
  }, 10000);
  it('test Log out Log out test user', async () => {
    let browser = await puppeteer.launch({
      headless: false
    });
    let page = await browser.newPage();
    page.emulate({
      viewport: {
        width: 1000,
        height: 2400
      },
      userAgent: ''
    });
    await page.goto(baseUrl);
    await performLogin(page, 'yw90', '123');
    await timeout(2000);
    await page.click('.userLogout');
    await timeout(1000);
    expect(page.url() === baseUrl || page.url() === baseUrl + '/').toBeTruthy();
    browser.close();
  }, 10000);
}); 