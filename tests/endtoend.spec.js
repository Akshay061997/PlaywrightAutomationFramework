const {test, expect} = require('@playwright/test');

// https://rahulshettyacademy.com/client/

test(`End To End flow`,async ({page})=>{
    const email ="akshaykumar874569@gmail.com";
    const productName='ZARA COAT 3';
    const products  = page.locator(".mb-3")
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Akshay@1197");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle')
    const count = await products.count();

    for(let i =0;i<count;i++){
       if( await products.nth(i).locator('b').textContent()===productName){
        await products.nth(i).locator("text=Add To Cart").click()
        break;
       }
    }

   
    await page.locator("[routerlink*=cart]").click();
    await page.locator(".cart li").waitFor();
    const bool=await page.locator("h3:has-text('ZARA COAT 3')").isVisible();

    await expect(bool).toBeTruthy();
    
    await page.locator("text=Checkout").click();
    await page.locator("[placeholder*='Country']").pressSequentially("ind",{delay:100});
    const options= page.locator(".ta-results");
    await options.waitFor();
    let optionscount= await options.locator("button").count();

    for(let i =0;i<optionscount;i++){
        if(await options.locator('button').nth(i).textContent()=== ' India'){
           await options.locator('button').nth(i).click();
            break;
        }
    }
    expect( await page.locator(".user__name [type='text']").first()).toHaveText(email);
    
    await page.locator(".ng-untouched input").nth(2).fill("481");
    await page.locator(".ng-untouched input").nth(3).fill("Akshay Bhatia");
    await page.locator(".action__submit").click();
    await page.locator(".hero-primary").waitFor();
    expect(await page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderid=await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    await page.locator("[routerlink*='myorders']").first().click();
    await page.locator(".table tbody tr th").first().waitFor();
   const countofOrders= await page.locator(".table tbody tr th").count();
   console.log(countofOrders);
   const OrderId=orderid.split(" ");
   
    for(let i =0;i<countofOrders;i++){
         console.log(await page.locator(".table tbody tr th").nth(i).textContent())
        if(await page.locator(".table tbody tr th").nth(i).textContent()===OrderId[2]){
            await page.locator(".table tbody tr .btn").nth(i).click();
            break;
            
        }
    }
    console.log(await page.locator('//p[@class="tagline"]').textContent());
   
    // .table tbody tr th
})