class CartPage {

    constructor(page) {
        this.page = page;
        this.checkout = page.locator("text=Checkout");
        this.country = page.locator("[placeholder*='Country']");
        this.options = page.locator(".ta-results");
        this.cvv = page.locator(".ng-untouched input");
        this.name = page.locator(".ng-untouched input");
        this.pay = page.locator(".action__submit");
        this.checkorderSuccessMessage = page.locator(".hero-primary");
        this.orderIDelement = page.locator(".em-spacer-1 .ng-star-inserted");
        
    }
    async addDetails() {
        
        await this.checkout.click();
        await this.country.pressSequentially("ind", { delay: 100 });
        
        await this.options.waitFor();
        let optionscount = await this.options.locator("button").count();

        for (let i = 0; i < optionscount; i++) {
            if (await this.options.locator('button').nth(i).textContent() === ' India') {
                await this.options.locator('button').nth(i).click();
                break;
            }
        }
        // expect(await page.locator(".user__name [type='text']").first()).toHaveText(email);

        await this.name.nth(2).fill("481");
        await this.name.nth(3).fill("Akshay Bhatia");
        await this.pay.click();
        await this.checkorderSuccessMessage.waitFor();


    }
    async getOrderId() {
        const orderid = await this.orderIDelement.textContent();
        return orderid
    }
}

module.exports = { CartPage };