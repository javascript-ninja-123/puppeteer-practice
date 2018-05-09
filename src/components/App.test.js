const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];
const faker = require('faker');

const user = {
  email:faker.internet.email(),
  password:'test',
  firstName:faker.name.firstName(),
  lastName:faker.name.lastName()
}


const isDebugging = () => {
  const debuggind_mode = {
    headless:false,
    slowMo:250,
    devtools:true
  }
  return process.env.NODE_ENV === 'debug' ? debugging_mode : {}
}

let brower;
let page;
let logs = [];
let errors = [];
beforeAll(async () => {
  browser = await puppeteer.launch(isDebugging())
  page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', interceptedRequest => {
  if (interceptedRequest.url().includes('swapi'))
    interceptedRequest.abort();
  else
    interceptedRequest.continue();
});
  page.on('console', c => {
    logs.push(c.text)
  })
  page.on('pageerror', e => errors.push(e.text))
  await page.goto('http://localhost:3000/')
  page.setViewport({width:500,height:2400})
})


describe('on page load', () => {
  test('h1 loads correctly', async () => {
      const html = await page.$eval('[data-testid="h1"]', el => {
        return el.innerHTML
      })
      expect(html).toBe('Hello World')
  })

  test('nav loads correctly', async () => {
    const navbar = await page.$eval('[data-testid="navbar"]', el => el ? true : false)
    const listItems = await page.$$('[data-testid="navBarLi"]');


    expect(navbar).toBe(true);
    if(listItems.length !== 4){
      await page.screenshot({
        path:'screenshot.png'
      })
    }
    expect(listItems.length).toBe(4)
  })


  describe('login form', () => {
    test('fill out login form', async () => {
        const page2 = await browser.newPage();
        await page2.emulate(iPhone);
        await page2.goto('http://localhost:3000/')

        await page2.setCookie({name:"JWT",value:'dsafasds'})


        const firstName = await page2.$('[data-testid="firstName"]')
        const lastname = await page2.$('[data-testid="lastName"]')
        const submitButton = await page2.$('[data-testid="submit"]')


        // await page.click('[data-testid="firstName"]')
        await firstName.tap()
        await page2.type('[data-testid="firstName"]', user.firstName)

        // await page.click('[data-testid="lastName"]')
            await lastname.tap()
        await page2.type('[data-testid="lastName"]', user.lastName)

        // await page.click('[data-testid="submit"]')
            await submitButton.tap()
        await page2.waitForSelector('[data-testid="success-message"]')

    })

    test('sets firstName cookie', async () => {
        const cookies = await page.cookies();
        const firstNameCookie = cookies.find(c => c.name === 'firstName' && c.value === user.firstName)
        expect(firstNameCookie).not.toBeUndefined();
    })




    // test('does not have any errors', () => {
    //       expect(errors.length).toBe(0)
    // })

    test('failed to fetch startWards endpoint', async () => {
      const h3 = await page.$eval('[data-testid="starWars"]', el => el.innerHTML)
      expect(h3).toBe('Something wrong')
    })

  })

})


afterAll(() => browser.close())
