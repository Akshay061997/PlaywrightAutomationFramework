const { test, expect } = require('@playwright/test');

const { POmanager } = require('../pageobjects/POmanager');

const dataSet=JSON.parse(JSON.stringify(require("../utils/Credandprodname.json")));

// https://rahulshettyacademy.com/client/
for(const data of dataSet){
test(`End To End flow  ${data.productName},${data.password}`, async ({ page }) => {
   
   

    const poanager = new POmanager(page);
    const login=poanager.getLoginPage();
    await login.goTo();
    await login.validLogin(data.email,data.password)
    const dashBoard = poanager.getDashBoardPage();
     await dashBoard.searchProduct( data.productName);
      await dashBoard.navigateToCart();
     
    const cartPage = poanager.getCartPage();
     await cartPage.addDetails();
    const orderid=await cartPage.getOrderId();
    // console.log(orderid)
    const orderdetailPage =poanager.getOrderdetail();
    await orderdetailPage.ClickOnOrderDetail(orderid);
    // console.log(await page.locator('//p[@class="tagline"]').textContent());

    // .table tbody tr th
})}