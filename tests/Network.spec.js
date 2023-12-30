const {test, expect,request} = require('@playwright/test');
const {APIUtils}=require('./utils/APIUtils')
const loginPayload = {
    userEmail: "akshaykumar874569@gmail.com",
    userPassword: "Akshay@1197"
  }

const orderPayload ={orders:[
    {
      country: "Cuba",
      productOrderedId: "6581ca979fd99c85e8ee7faf"
    }
  ]}
let token;
let orderId;
const fakepayload = {data:[],message:"No Orders"};

test.beforeAll(async()=>{

const apiContext = await request.newContext();
const Apiutils= new APIUtils(apiContext,loginPayload);
const response= await Apiutils.createOrder(orderPayload);
orderId=response.orderId;
token= response.token;

 });

test.beforeEach(()=>{})
// https://rahulshettyacademy.com/client/

test(`place order`,async ({page})=>{
    
     page.addInitScript(value =>{window.localStorage.setItem('token',value)},token);

     await page.goto("https://rahulshettyacademy.com/client");
    // await page.locator("#userEmail").fill(email);
    // await page.locator("#userPassword").fill("Akshay@1197");
    // await page.locator("[value='Login']").click();
    // await page.waitForLoadState('networkidle')
        
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",async route=>{

    const response =await page.request.fetch(route.request())
    let body = JSON.stringify(fakepayload)
    await route.fulfill({
      response,
      body
    })

    })
 
    await page.locator("[routerlink*='myorders']").first().click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
    // await page.pause()
    expect(await page.locator(".mt-4")).toHaveText(" You have No Orders to show at this time. Please Visit Back Us ")
    // await page.locator("")
    // .table tbody tr th
})


