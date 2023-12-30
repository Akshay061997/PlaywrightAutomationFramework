const {test, expect} = require('@playwright/test');

// https://rahulshettyacademy.com/AutomationPractice/

test(`popup validation`,async ({browser})=>{
   const context =await browser.newContext()
   const page = await context.newPage();
await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
// await page.goto("https://google.com");
// await page.goBack();
// await page.goForward();
// await page.reload();

await expect( page.locator('#displayed-text')).toBeVisible();

await page.locator("#hide-textbox").click();

await expect(page.locator('#displayed-text')).toBeHidden()
page.on('dialog',dialog => dialog.accept());

await page.locator('#confirmbtn').click();

await page.locator('#mousehover').hover();

const framepage=page.frameLocator("#courses-iframe");

await framepage.locator('[href*="lifetime"]:visible').click();

const findsus=await framepage.locator(".text h2").textContent();

console.log(findsus.split(" ")[1]);
})


test(`Screenshot and Visual Code`,async ({page})=>{

await page.setViewportSize({width:1920,height:1080});

   
   
await page.goto("https://rahulshettyacademy.com/AutomationPractice/");


await expect( page.locator('#displayed-text')).toBeVisible();

await page.locator("#hide-textbox").click();
await page.screenshot({path:"screenshot.png"})
await expect(page.locator('#displayed-text')).toBeHidden()
})

test.only(`Visual Test`,async ({page})=>{
   await page.setViewportSize({width:1920,height:1080});
   await page. goto ("https://flightaware.com/");
   expect (await page.screenshot ()) .toMatchSnapshot('landing.png');
})