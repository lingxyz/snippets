/**
 * docsify 自定义插件：文档目录
 * 参考文档：https://docsify.js.org/#/zh-cn/write-a-plugin
 */
 window.$docsify.plugins.push(function(hook, vm) {
  hook.doneEach(function() {
    // 解析成 html 后调用。
    // beforeEach 和 afterEach 支持处理异步逻辑
    // ...
    // 异步处理完成后调用 next(html) 返回结果
    vm.heads = document.querySelectorAll("h2");
    var sidebar = '';
    vm.heads.forEach(item => {
      console.log(item.innerHTML);
      sidebar += item.innerHTML;
    });
    console.log(sidebar)

    // console.log(html.replaceAll(/.*(\<h2\>.*\<\/h2\>).*/g, '$1'));
    // sidebar = "1111";
    // next(html+sidebar);
  });
})