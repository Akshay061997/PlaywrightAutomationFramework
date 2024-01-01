const { CartPage } = require("./CartPage");
const { DashBoard } = require("./DashBoard");
const { LoginPage } = require("./LoginPage");
const { OrderDetailPage } = require("./OrderDetailPage");

class POmanager{
    constructor(page){
        this.page=page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardpage = new DashBoard(this.page);
        this.cartpage = new CartPage(this.page);
        this.orderdetail= new OrderDetailPage(this.page);

    }

     getLoginPage(){
        return this.loginPage;
    }
     getDashBoardPage(){
        return this.dashboardpage;
    }
     getCartPage(){
        return this.cartpage;
    }
    getOrderdetail(){
        return this.orderdetail;
    }

}

module.exports= {POmanager};