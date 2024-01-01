class APIUtils {



    constructor(apiContext,loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload=loginPayload;
    }
    async getToken() {

        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", { data: this.loginPayload })

        

        const loginResponseJson = await loginResponse.json();

       const token = loginResponseJson.token;
        console.log(token)
        return token
    }

    async createOrder(orderPayload) {

        const response ={};
        let token = await this.getToken();
        console.log(token);
        const OrderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
        
            data: orderPayload,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })
        const OrderResponseJson = await OrderResponse.json();
        console.log(OrderResponseJson)
        let orderId =OrderResponseJson.orders[0];
        response.token = token;
        response.orderId= orderId;
        return response;
    }
}

module.exports ={APIUtils};