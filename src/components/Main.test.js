const Page = require('./puppeteer');

let page;
let fetchArrays = ['https://jsonplaceholder.typicode.com/posts']

beforeAll(async () => {
  page = await Page.build('http://localhost:3000/main')
  await page.initiate(fetchArrays)
  console.log('page is initiated')
})


describe('test main page', () => {
  test('has a h1', async () => {
    const html = await page.loadHTML('data-testid="mainH1"')
    expect(html).toBe('This is a main page');
  })


  test('type form and submit', async () => {
    await page.clickAndType('[data-testid="firstName"]','sung')
    await page.clickAndType('[data-testid="lastName"]','yi')
    await page.click('[data-testid="submit"]')
    await page.waitForSelector('[data-testid="success-message"]')
  })

  test('redirect back to /', async () => {
    await page.click('[data-testid="linktoHome"]')
    await page. goto('http://localhost:3000/')
  })
})


afterAll(() => page.closeBrowser())
