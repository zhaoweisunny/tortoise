/**
 * Created by zhaowei on 16/11/2.
 */

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
import App from './App'
const Bar = { template: '<div>bar</div>' }
const Test = { template: '<div>Test</div>' }
const New = { template: '<div>New</div>' }

export default [
  { path: '/foo', component: App },
  { path: '/bar', component: Bar },
  { path: '/test/:id', component: Test },
  { path: '/new', component: New }
]

