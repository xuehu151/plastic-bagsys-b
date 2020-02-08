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


}
