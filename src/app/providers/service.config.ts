import { environment } from '../../environments/environment';

export class ServiceConfig {
    // 获取首页数据
    public static APIBASE = environment.apiBase;
    public static LOGIN = 'public/loginByPassword'; // 登录
    public static GETUSERINFO = 'sys/user/getUserInfo';//获取用户信息
    public static BINDCALLBACK = 'public/bindCallback/'; //第三方绑定
    public static RENDER = 'public/render/';
    public static AGENTFUND = 'biz/agent/agentFund';
    public static WITHDRAW = 'biz/withdraw/add';//提现
    public static WITHDRAWHIS = '/biz/withdraw/myFindPage';//提现记录
    public static GOODLIST  = 'biz/goods/list';//商品列表
    public static PURCHASEHISTORY = 'biz/order/purchase/find';//采购历史
    public static PLACEORDER = 'biz/order/purchase/add';//下单
    public static PAUMENT = 'biz/pay/add';//支付
    public static MYDEVICELIST = '/biz/device/myDeviceList';
    public static ORDERDETAIL = '/biz/device/myCount';


}
