class OrderDetailPage{

    constructor(page){
        this.page=page;
        this.myorder=this.page.locator("[routerlink*='myorders']");
        this.checkOrder = this.page.locator(".table tbody tr th");

    }

    async ClickOnOrderDetail(orderid){
        await this.myorder.first().click();
        await this.checkOrder.first().waitFor();
        const countofOrders = await this.checkOrder.count();
        
        const OrderId = orderid.split(" ")[2];
        
        for (let i = 0; i < countofOrders; i++) {
            console.log(await this.checkOrder.nth(i).textContent())
            if (await this.checkOrder.nth(i).textContent() === OrderId) {
                await this.checkOrder.nth(i).click();
                break;
    
            }
        }
    }
}

module.exports={OrderDetailPage}