/**
 * Created by zhaowei on 16/11/2.
 */

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// import App from './App'
// 导入vue模块
import Hello from './components/user/Hello'
import Test from './components/user/Test'
export default [
  { path: '/hello', component: Hello },
  { path: '/test', component: Test }
]

