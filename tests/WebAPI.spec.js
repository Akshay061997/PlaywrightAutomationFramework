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
        
    
 
    await page.locator("[routerlink*='myorders']").first().click();
    await page.locator(".table tbody tr th").first().waitFor();
   const countofOrders= await page.locator(".table tbody tr th").count();
   console.log(countofOrders);

   
    for(let i =0;i<countofOrders;i++){
         console.log(await page.locator(".table tbody tr th").nth(i).textContent())
        if(await page.locator(".table tbody tr th").nth(i).textContent()===orderId){
            await page.locator(".table tbody tr .btn").nth(i).click();
            break;
            
        }
    }
    console.log(await page.locator('//p[@class="tagline"]').textContent());
   
    // .table tbody tr th
})


