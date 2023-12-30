const {test, expect} = require('@playwright/test');

test.only(`First Playwrite Testcase`,async ({browser})=>{


const context=await browser.newContext();
const page =await context.newPage();
await page.route('**/*.css',route=>route.abort());
const userName =  page.locator('#username');
const passWord = page.locator('#password');
const signIn = page.locator('#signInBtn');
await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
await userName.fill("rahulshetty")
await passWord.fill("learning")
await signIn.click();
console.log(await page.locator("[style*='block']").textContent())
await expect(page.locator("[style*='block']")).toContainText('Incorrect')
await userName.fill('');
await userName.fill('rahulshettyacademy');
await passWord.fill("");
await passWord.fill("learning")
await signIn.click();
//  console.log(await page.locator(".card-body a").nth(0).textContent());

await page.locator(".card-body a").nth(1).waitFor();
console.log(await page.locator(".card-body a").allTextContents())
});
test(`UI Controls`,async ({page})=>{

   
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const dropDown= page.locator('select.form-control');
    await dropDown.selectOption("consult");
    // await page.pause();
    await page.locator("input[value='user']").click();
    await page.locator("#okayBtn").click();
    await expect(page.locator("input[value='user']")).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect (page.locator('[href*="https://rahulshettyacademy.com/"]')).toHaveAttribute('class','blinkingText');
    });


    test(`child window handle`,async ({browser})=>{
    

        const context=await browser.newContext();
        const page =await context.newPage();
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        const link  = page.locator("[href*='documents-request']");

        const [newpage] =await Promise.all(
            [page.waitForEvent('popup'),// here popup is used to 
            link.click(),
            ]
        )
        const textoupt=await newpage.locator(".red").textContent();
        const outputarr=textoupt.split(" ");
       let textout= ''
        for (let index = 0; index < outputarr.length; index++) {
            if(outputarr[index].includes('@')){
                textout=outputarr[index]
                console.log(outputarr[index])
            }
            
        }

        await page.locator("#username").fill(textout)

        
        });