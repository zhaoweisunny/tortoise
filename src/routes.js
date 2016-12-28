/**
 * Created by zhaowei on 16/11/2.
 */

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 导入vue模块
import Login from './components/user/Login'
import Main from './components/user/Main'
import Welcome from './components/user/Welcome'
import WarmingType from './components/user/WarmingType'
import Bus from './components/user/Bus'
import Phone from './components/user/Phone'
import Packet from './components/user/Packet'
import WarmingRecord from './components/user/WarmingRecord'
import PhoneUser from './components/user/PhoneUser'
export default [
  { path: '/', name: 'login', component: Login },
  {
    path: '/main',
    name: 'main',
    component: Main,
    children: [
      {path: '/', name: 'welcome', component: Welcome},
      {path: '/warmingType/:pageNum/:pageSize', name: 'warmingType', component: WarmingType},
      {path: '/bus/:pageNum/:pageSize', name: 'bus', component: Bus},
      {path: '/phone/:pageNum/:pageSize', name: 'phone', component: Phone},
      {path: '/packet/:pageNum/:pageSize?/ids', name: 'packet', component: Packet},
      {path: '/warmingRecord/:pageNum/:pageSize', name: 'warmingRecord', component: WarmingRecord},
      {path: '/phoneUser/:pageNum/:pageSize', name: 'phoneUser', component: PhoneUser}
    ]
  }
]

