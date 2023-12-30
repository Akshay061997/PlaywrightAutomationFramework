const {test} = require('@playwright/test');


test(`secuity test`,async ({page})=>{
    const email ="akshaykumar874569@gmail.com";
    const productName='ZARA COAT 3';
    const products  = page.locator(".mb-3")
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Akshay@1197");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle')
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*',
    route=>route.
    continue({url:'https://rahulshettyacademy.com/apiecom/order/get-orders-details?id=621661f884b053f6765465b6'}))
    await page.locator("[routerlink*='myorders']").first().click();
    await page.locator("button:has-text('View')").first().click()
    await page.pause()
    
})

