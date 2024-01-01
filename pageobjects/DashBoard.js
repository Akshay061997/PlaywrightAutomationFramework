class DashBoard {


    constructor(page) {
        this.page = page;
        this.products = page.locator(".mb-3");
        this.cart = page.locator("[routerlink*=cart]");
    }

    async searchProduct(productName) {

        const count = await this.products.count();

        for (let i = 0; i < count; i++) {
            if (await this.products.nth(i).locator('b').textContent() === productName) {
                await this.products.nth(i).locator("text=Add To Cart").click()
                break;
            }
        }


       
    }

    async navigateToCart() {
        
        await this.cart.click();
        await this.page.locator("div li").first().waitFor();
        
    }
}

module.exports ={DashBoard};