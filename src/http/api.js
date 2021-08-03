import { post, get} from "./config";

// index

//新版本新增接口
export const classifyImg = params => post('/api/image/index',params);   //按分类返回图片列表
export const logoList = params => post('/api/logo/phoneList',params);   //图片列表
export const logoCate = params => post('/api/logo/logoCate',params);   //分类列表
export const homeImg = params => post('/api/logo/logoList',params);   //分类列表
export const message = params => post('/api/logo/sendMessage',params);   //留言板
export const phoneBanner = params => post('/api/logo/phoneBanner',params);   //首页banner
export const homeVideo = params => post('/api/logo/videoList',params);   //视频列表
export const login = params => post('/api/user/login',params);   //登录
export const register = params => post('/api/user/register',params);   //注册
export const editPass = params => post('/api/user/editPass',params);   //修改密码
export const smsSend = params => post('/api/user/sendCode',params);   //发送短信
export const createOrder = params => post('/api/shoot/createOrder',params);   //创建摄影
export const orderList = params => post('/api/shoot/orderList',params);   //用户摄影列表
export const notReceived = params => post('/api/shoot/notReceived',params);   //待摄影师接单拍摄列表
export const getReceived = params => post('/api/shoot/getReceived',params);   //摄影师确认接单
export const sceneList = params => post('/api/shoot/sceneList',params);   //摄影师待现场确认订单列表
export const getScene = params => post('/api/shoot/getScene',params);   //摄影师已现场确认待客户确认
export const getEndShoot = params => post('/api/shoot/getEndShoot',params);   //客户确认完单



