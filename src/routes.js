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
export default [
  { path: '/', name: 'login', component: Login },
  {
    path: '/main',
    name: 'main',
    component: Main,
    children: [
      {path: '/', name: 'welcome', component: Welcome},
      {path: '/warmingType', name: 'warmingType', component: WarmingType},
      {path: '/bus', name: 'bus', component: Bus},
      {path: '/phone', name: 'phone', component: Phone},
      {path: '/packet', name: 'packet', component: Packet}
    ]
  }
]

