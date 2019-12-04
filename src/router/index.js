import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
import test1 from "@/common/test1"
import test2 from "@/common/test2"
export default new Router({
  routes: [
    // 主页
    {
      path: "/",
      name: "indexPage",
      redirect: "/home",
    },
    {
      path: "/home1",
      name: "hometestpage",
      component: resolve=>(require(["@/components/home1"],resolve)),
    },
    //首页
    {
      path: "/home",
      name: "homePage",
      component: resolve=>(require(["@/components/home"],resolve)),
    },{
      path: "/authfail",
      name: "authfail",
      component: resolve=>(require(["@/components/authfail"],resolve)),
    },
    //挂号列表
    {
      path: "/orderList",
      name: "orderList",
      component: resolve=>(require(["@/components/orderList.vue"],resolve)),
    },
    //挂号预约页面
    {
      path: "/appointment",
      name: "appointmentPage",
      component: resolve=>(require(["@/components/appointment"],resolve)),
      
    },
    //医生评价
    {
      path: "/evaluate",
      name: "evaluate",
      component: resolve=>(require(["@/components/evaluate"],resolve)),
    },
    //确认挂号信息
    {
      path: "/registeredInfo",
      name: "registeredInfo",
      component: resolve=>(require(["@/components/registeredInfo/registeredInfo"],resolve)),
    },
    //我的账户
    {
      path: "/Myaccount",
      name: "Myaccount",
      component: resolve=>(require(["@/components/Myaccount/Myaccount"],resolve)),
    },
    //就诊卡
    {
      path: "/myCard",
      name: "myCardPage",
      component: resolve=>(require(["@/components/myCard/myCard"],resolve)),
    },
    //我的账单
    {
      path: "/Mybill",
      name: "Mybill",
      component: resolve=>(require(["@/components/Mybill/Mybill"],resolve)),
    },
    //账单详情
    {
      path: "/Billdetails",
      name: "Billdetails",
      component: resolve=>(require(["@/components/Mybill/Billdetails"],resolve)),
    },
    //就诊卡充值 
    {
      path: "/recharge",
      name: "recharge",
      component: resolve=>(require(["@/components/myCard/recharge"],resolve)),
    },
    //充值 
    {
      path: "/rechargeamount",
      name: "rechargeamount",
      component: resolve=>(require(["@/components/myCard/rechargeamount"],resolve)),
    },
    // 充值记录
    {
      path: "/rechargerecord",
      name: "rechargerecord",
      component: resolve=>(require(["@/components/myCard/rechargerecord"],resolve)),
    },
    //关注的医生
    {
      path: "/myCollect",
      name: "myCollectPage",
      component: resolve=>(require(["@/components/myCollect/myCollect"],resolve)),
    },
    //微信支付
    {
      path: "/payment",
      name: "payment",
      component: resolve=>(require(["@/components/payment"],resolve)),
    },
    //我的评论
    {
      path: "/Myevaluation",
      name: "Myevaluation",
      component: resolve=>(require(["@/components/Myevaluation"],resolve)),
    },
    
    //身份验证
    {
      path: "/authentication",
      name: "authentication",
      component: resolve=>(require(["@/components/authentication/authentication"],resolve)),
      // meta: {
      //   requiresAuth: true,
      //   privilege: ['capacityStatus'],
      //   keepAlive: true,//此组件需要被缓存
      //   isBack:false, //用于判断上一个页面是哪个
      // }
    },
    {
      path: "/reportss",
      name: "reportss",
      component: resolve=>(require(["@/components/reports/reportss"],resolve)),
      meta: { index:38},
    },
    
    //我的检查
    {
      path: "/MyExamine",
      name: "MyExamine",
      component: resolve=>(require(["@/components/MyExamine/MyExamine"],resolve)),
    },
    //检查处方
    {
      path: "/Myincidentals",
      name: "Myincidentals",
      component: resolve=>(require(["@/components/Myincidentals/Myincidentals"],resolve)),
    },
    
    //我的化验
    {
      path: "/Myassay",
      name: "Myassay",
      component: resolve=>(require(["@/components/Myassay/Myassay"],resolve)),
    },
    //药品处方
    {
      path: "/Myprescription",
      name: "Myprescription",
      component: resolve=>(require(["@/components/Myprescription/Myprescription"],resolve)),
    },
    //化验处方
    {
      path: "/Laboratorys",
      name: "Laboratorys",
      component: resolve=>(require(["@/components/Laboratorys/Laboratorys"],resolve)),
    },
    //治疗处方
    {
      path: "/Mycure",
      name: "Mycure",
      component: resolve=>(require(["@/components/Mycure/Mycure"],resolve)),
    },
    //我的病例
    {
      path: "/Mycase",
      name: "Mycase",
      component: resolve=>(require(["@/components/Mycase/Mycase"],resolve)),
    },
    //产后评估
    {
      path: "/Postpartumassessment",
      name: "Postpartumassessment",
      component: resolve=>(require(["@/components/Postpartumassessment/Postpartumassessment"],resolve)),
    },
    //预约住院
    {
      path: "/hospitalrder",
      name: "hospitalrder",
      component: resolve=>(require(["@/components/hospitalrder/hospitalrder"],resolve)),
    },
    //咨询医生
    {
      path: "/consultadoctor",
      name: "consultadoctor",
      component: resolve=>(require(["@/components/Consultadoctor/consultadoctor"],resolve)),
    },
    {
      path: "/doctorList",
      name: "doctorList",
      component: resolve=>(require(["@/components/Consultadoctor/doctorList"],resolve)),
    },
    {
      path: "/consultationHome",
      name: "consultationHome",
      component: resolve=>(require(["@/components/Consultadoctor/consultationHome"],resolve)),
    },
    //描述病情
    {
      path: "/describecondition",
      name: "describecondition",
      component: resolve=>(require(["@/components/Consultadoctor/describecondition"],resolve)),
    },
    //选择患者
    {
      path: "/selectionpatients",
      name: "selectionpatients",
      component: resolve=>(require(["@/components/Consultadoctor/selectionpatients"],resolve)),
    },
    //订单支付
    {
      path: "/consulOrder",
      name: "consulOrder",
      component: resolve=>(require(["@/components/Consultadoctor/consulOrder"],resolve)),
    },
    //支付成功
    {
      path: "/Successfulpayment",
      name: "Successfulpayment",
      component: resolve=>(require(["@/components/Consultadoctor/Successfulpayment"],resolve)),
    },
    //订单详情
    {
      path: "/Orderdetails",
      name: "Orderdetails",
      component: resolve=>(require(["@/components/Consultadoctor/Orderdetails"],resolve)),
    },
    //医生列表
    {
      path: "/yishenList",
      name: "yishenList",
      component: resolve=>(require(["@/components/Consultadoctor/yishenList"],resolve)),
    },
    //回复列表
    {
      path: "/pReplylist",
      name: "pReplylist",
      component: resolve=>(require(["@/components/Consultadoctor/Replylist"],resolve)),
    },
    
    /**====================================================医生端======================================================== */
    {
      path: "/doctorvisit",
      name: "doctorvisit",
      component: resolve=>(require(["@/components/doctor/doctorpersonal/doctorvisit"],resolve))
    },
    {
      path: "/detail",
      name: "detail",
      component: resolve=>(require(["@/components/doctor/detail"],resolve))
    },
    //写拟诊
    {
      path: "/examination",
      name: "examination",
      component: resolve=>(require(["@/components/doctor/examination"],resolve))
    },
    //开处方
    {
      path: "/prescription",
      name: "prescription",
      component: resolve=>(require(["@/components/doctor/prescription"],resolve))
    },
    //开中药
    {
      path: "/zhprescription",
      name: "zhprescription",
      component: resolve=>(require(["@/components/doctor/zhprescription"],resolve))
    },
    //医生验证登录
    {
      path: "/doctorlogin",
      name: "doctorlogin",
      component:resolve=>(require(["@/components/doctor/doctorlogin"],resolve))
    },
    //医生挂号患者列表
    {
      path: "/registeredlist",
      name: "registeredlist",
      component: resolve=>(require(["@/components/doctor/registeredlist"],resolve))
    },
    //患者病历详情
    {
      path: "/medicalrecords",
      name: "medicalrecords",
      component: resolve=>(require(["@/components/doctor/medicalrecords"],resolve))
    },
    {
      path: "/doctorckeck",
      name: "doctorckeck",
      component: resolve=>(require(["@/components/doctor/doctorchecklist"],resolve))
    },
    //写检查
    {
      path: "/writecheck",
      name: "writecheck",
      component: resolve=>(require(["@/components/doctor/writecheck"],resolve))
    },
    //写病历
    {
      path: "/writerecords",
      name: "writerecords",
      component: resolve=>(require(["@/components/doctor/writerecords"],resolve))
    },
    //写化验
    {
      path: "/writingtest",
      name: "writingtest",
      component: resolve=>(require(["@/components/doctor/writingtest"],resolve))
    },
    //医生查询开过的检查
    {
      path: "/checkresult",
      name: "checkresult",
      component: resolve=>(require(["@/components/doctor/doctorckeckjc"],resolve))
    },
    //医生查询开过的病历
    {
      path: "/doctorckeckrec",
      name: "doctorckeckrec",
      component: resolve=>(require(["@/components/doctor/doctorckeckrec"],resolve))
    },
    //医生查询开过的化验
    {
      path: "/doctorckecktest",
      name: "doctorckecktest",
      component: resolve=>(require(["@/components/doctor/doctorckecktest"],resolve))
    },
    //医生查询开过的药方
    {
      path: "/doctorckeckdrug",
      name: "doctorckeckdrug",
      component: resolve=>(require(["@/components/doctor/doctorckeckdrug"],resolve))
    },
    //医生查询检查结果
    {
      path: "/doctorckeckjctresult",
      name: "doctorckeckjctresult",
      component: resolve=>(require(["@/components/doctor/doctorckeckjcresult"],resolve))
    },
    //医生查询化验结果
    {
      path: "/doctorckecktestresult",
      name: "doctorckecktestresult",
      component: resolve=>(require(["@/components/doctor/doctorckecktestresult"],resolve))
    },
    //医生个人中心
    {
      path: "/Personalcenter",
      name: "Personalcenter",
      component: resolve=>(require(["@/components/doctor/doctorpersonal/Personalcenter"],resolve))
    },{
      path: "/settingup",
      name: "settingup",
      component: resolve=>(require(["@/components/doctor/doctorpersonal/settingup"],resolve))
    },
    //医生个人简介
    {
      path: "/Personalprofile",
      name: "Personalprofile",
      component: resolve=>(require(["@/components/doctor/doctorpersonal/Personalprofile"],resolve))
    },
    //医生名片
    {
      path: "/MaxCard",
      name: "MaxCard",
      component: resolve=>(require(["@/components/doctor/doctorpersonal/MaxCard"],resolve))
    },
    //历史患者
    {
      path: "/Historicpatients",
      name: "Historicpatients",
      component: resolve=>(require(["@/components/doctor/doctorpersonal/Historicpatients"],resolve))
    },
    //评论中心
    {
      path: "/Commentinformation",
      name: "Commentinformation",
      component: resolve=>(require(["@/components/doctor/doctorpersonal/Commentinformation"],resolve))
    },
    //关注的患者
    {
      path: "/Concernedpatients",
      name: "Concernedpatients",
      component: resolve=>(require(["@/components/doctor/doctorpersonal/Concernedpatients"],resolve))
    },
    //医生钱包
    {
      path: "/Mywallet",
      name: "Mywallet",
      component: resolve=>(require(["@/components/doctor/doctorpersonal/Mywallet"],resolve))
    },
    //收入明细
    {
      path: "/Incomedetails",
      name: "Incomedetails",
      component: resolve=>(require(["@/components/doctor/doctorpersonal/Incomedetails"],resolve))
    },
    //回复列表
    {
      path: "/Replylist",
      name: "Replylist",
      component: resolve=>(require(["@/components/doctor/doctorpersonal/Replylist"],resolve))
    },
    //医生回复
    {
      path: "/doctorsreply",
      name: "doctorsreply",
      component: resolve=>(require(["@/components/doctor/doctorpersonal/doctorsreply.vue"],resolve))
    },
    //康复评估
    {
      path: "/recure",
      name: "recure",
      component: resolve=>(require(["@/components/doctor/recure"],resolve))
    },


     /**===============================================预约住院=================================================== */
     //预约列表
     {
      path: "/hospitalist",
      name: "hospitalist",
      component: resolve=>(require(["@/components/appointmenthospital/hospitalist"],resolve))
    },
    /**===============================================异常界面=================================================== */
    //异常界面
    {
      path: "/abnormal",
      name: "abnormal",
      component: resolve=>(require(["@/common/abnormal"],resolve))
    },
    {
      path: "/test1",
      name: "test1",
      component: test1,
    },
    {
      path: "/test2",
      name: "test2",
      component: test2
    },
    /**====================================================帮助======================================================== */
    //流程图
    {
      path: "/shortcutenter",
      name: "shortcutenter",
      component:resolve=>(require(["@/components/help/shortcutenter"],resolve))
    },
    //流程图
    {
      path: "/register",
      name: "register",
      component:resolve=>(require(["@/components/help/register"],resolve))
    },
    //流程图
    {
      path: "/askdoctor",
      name: "askdoctor",
      component:resolve=>(require(["@/components/help/askdoctor"],resolve))
    },
    {
      //帮助
      path: "/helphome",
      name: "helphome",
      component:resolve=>(require(["@/components/help/helphome"],resolve))
    },


    /**================================================后台管理系统==================================================== */
    //首页
    {
      path: "/admin",
      name: "admin",
      component:resolve=>(require(["@/admin/admin"],resolve))
    },
    //医生管理列表
    {
      path: "/doctormanagement",
      name: "doctormanagement",
      component:resolve=>(require(["@/admin/doctormanagement/doctormanagement"],resolve))
    },
    //科室管理列表
    {
      path: "/administrativemanagement",
      name: "administrativemanagement",
      component:resolve=>(require(["@/admin/administrativemanagement/administrativemanagement"],resolve))
    },
    //添加修改医生
    {
      path: "/addDoctor",
      name: "addDoctor",
      component:resolve=>(require(["@/admin/doctormanagement/addDoctor"],resolve))
    },
    //添加修改科室
    {
      path: "/addattachment",
      name: "addattachment",
      component:resolve=>(require(["@/admin/administrativemanagement/addattachment"],resolve))
    },
    //患者权限管理
    {
      path: "/authoritymanagement",
      name: "authoritymanagement",
      component:resolve=>(require(["@/admin/authoritymanagement/authoritymanagement"],resolve))
    },
    // 收入信息
    {
      path: "/Incomestatements",
      name: "Incomestatements",
      component:resolve=>(require(["@/admin/Incomestatements/Incomestatements"],resolve))
    },
    //收入明细
    {
      path: "/particulars",
      name: "particulars",
      component:resolve=>(require(["@/admin/Incomestatements/particulars"],resolve))
    },
    // 管理员管理列表
    {
      path: "/Administrator",
      name: "Administrator",
      component:resolve=>(require(["@/admin/Administrator/Administrator"],resolve))
    },
    //添加管理员
    {
      path: "/addAdministrator",
      name: "addAdministrator",
      component:resolve=>(require(["@/admin/Administrator/addAdministrator"],resolve))
    },
  ]
});
