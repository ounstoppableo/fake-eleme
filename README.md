# 简介
这是一个伪饿了么移动端的单页面（SPA）应用
基于https://github.com/bailicangdu/vue2-elm项目的vue2练手项目，沿用了结构和样式，然后自己重新使用vue2搭建
接口文档：https://github.com/bailicangdu/node-elm/blob/master/API.md

# 想法
虽然写的是依托石山，但是还是有所收获的
## 过程中遇到的一些问题
#### 设置登陆模块时，测试登录会发生验证码失效问题

> 因为登录时对验证码的验证操作是通过cookies找到对应的session然后进行对比确的
>
> 所以引起这个问题的原因：
>
> - 浏览器不接受我们向验证码接口发送请求后服务器返回的响应头中带的set-cookies，因为是跨域的。所以我们本地没有存储cookies
> - 向登录接口发送请求后，由于本地没有cookies，所以我们的请求头没有携带cookies
>
> 解决的方法：
>
> - 这时候需要解除浏览器跨域设置cookies的问题：https://juejin.cn/post/7073447264756170765
>
> - 完成上述操作之后，虽然浏览器能设置cookies了，但是如果使用的ajax请求包不支持请求头带上跨域cookies也无济于事，
>   axios解决请求头带上跨域cookies的方法：在axios配置项内添加withCredentials: true

#### 关于盒子的offsetHeight问题

> 假设一个场景：父盒子是overflow: auto的，子盒子与父盒子内容高度相同
>
> 也就是说子盒子的高度实际上就是父盒子的scrollHeight，这时子盒子的offsetHeight很容易迷糊，我们会想当然的认为子盒子的offsetHeight就是父盒子展现在页面的高度，而不包括卷去高度，实际上子盒子的offsetHeight等于父盒子的scrollHeight
>
> 而父盒子的offsetHeight才等于展现在页面的高度，不包括卷去高度

#### vue2自定义指令的小Tips

> 我们定义一个自定义指令
>
> ~~~javascript
> dereactives: {
> 	demo(ele,binding,vnode){
> 
>  }
> }
> ~~~
>
> 由于接收的参数没有直接指向vue实例的，有时候想修改vue实例上的值很不方便，这时候通过vnode.context就可以拿到vue实例

#### 使用vuex的小坑

> 使用vuex3时，使用mutations对state进行修改时，必须遵循vue2中对数据操作的方法，不然可能不会得到响应式数据。比如对对象的操作不能用增删属性，对数组的操作必须使用定义的几个函数，不能直接以arr[index]的形式赋值
>
> 原理：vuex3使用的也是defineProperty监测不到增删属性的动作

#### vue2中的watch和computed

> 这里不是为了说它们的区别
>
> 主要是说一下它们的监听原理：
>
> - computed监测的必须是带有响应式的数据（vue2实例通过defineProperty生成的数据），否则computed执行该数据的getter时，没有把自己放入到该数据的setter执行队列中，以后即使该数据发生改变，不管执行多少次setter，都和computed没什么关系了
> - watch也是类似的原理，配置项中的函数就是将会被添加至监测数据的setter函数执行队列中，未来发生改变就会从执行队列中取出执行，所以如果数据不是响应式的，就监测不到
>
> 由于都是基于defineProperty的响应式数据，所以修改时需要遵守官方规则

#### 动态import

> 使用import from引入路由组件后，打包后的效果
>
>![image](https://github.com/ounstoppableo/fake-eleme/assets/116772707/cb12acc2-c970-4077-bc96-6a86475a08e8)

>
> 使用动态引入之后
>
> ![image](https://github.com/ounstoppableo/fake-eleme/assets/116772707/44991d72-e844-4951-8b61-0ea33278b529)

>
> 也就是说每个动态引入的路由组件都自成一个js文件，这样加载页面的时候就可以做到按需加载，而不是一开始就将所有的组件加载完，造成初始页面卡顿的情况。

