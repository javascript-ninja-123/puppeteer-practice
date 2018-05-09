const puppeteer = require('puppeteer');

class Custompage{
  static async build(url){
    const browser = await puppeteer.launch({
      headless:false,
      devtools:true
    })
    const page = await browser.newPage();
    const customPage = new Custompage(browser,page,url);

    return await new Proxy(customPage, {
    get:(target,property) => target[property] || browser[property] || page[property]
  })

  }
  constructor(browser,page,url){
    // this.isDebugging = () => {
    //   const debuggind_mode = {
    //     headless:false,
    //     slowMo:250,
    //     devtools:true
    //   }
    //   return process.env.NODE_ENV === 'debug' ? debugging_mode : {}
    // }
    this.browser = browser;
    this.page = page;
    this.logs = [];
    this.errors = [];
    this.url = url;
  }


  async initiate(fetchArrays = []){
    if(fetchArrays.length > 0){
      await this.page.setRequestInterception(true);
      fetchArrays.forEach(fetchURL => {
        this.page.on('request', interceptedRequest => {
        if (interceptedRequest.url().includes(fetchURL)){
          interceptedRequest.abort();
        }
        else{
          interceptedRequest.continue();
        }
        });
      })
    }

    this.page.on('console', c => {
      this.logs.push(c.text)
    })
    this.page.on('pageerror', e => this.errors.push(e.text))
    await this.page.goto(this.url)

  }

  async loadHTML(dataId){
    return await this.page.$eval(`[${dataId}]`, el =>  el.innerHTML)
  }

  async loadCorrectly(dataId){
    return await this.page.$eval(`[${dataId}]`, el => el ? true : false)
  }

  async clickAndType(dataId,text){
    await this.page.click(dataId)
    await this.page.type(dataId, text);
  }

  closeBrowser(){
    this.browser.close()
  }

}

module.exports = Custompage;
