/**
 * docsify 自定义插件：文档目录
 * 参考文档：https://docsify.js.org/#/zh-cn/write-a-plugin
 */
(function () {
  var myPlugin = function (hook, vm) {
    // // Invoked on each page load after new HTML has been appended to the DOM
    hook.afterEach(function(html) {
      console.log(vm.compiler.cacheTOC)
      console.log(vm.route)
      const headerTree = vm.compiler.cacheTOC[vm.route.file];
      let headerTreeHTML = '';
      headerTree.forEach(item => {
        if (item.level === 1) return;
        headerTreeHTML +=
        `<li>
          <a class="section-link" href="${item.slug}" title="${item.title}" style="font-weight: normal;text-decoration: none;">${item.title}</a>
        </li>`;

      })
      var docSideBar = [
          '<ul class="doc-sidebar" style="position: fixed; right: 20px;top: 50%;transform: translateY(-50%);z-index: 1;">',
          headerTreeHTML,
          '</ul>',
        ].join('');
      return docSideBar + html;
    });
  };

  // Add plugin to docsify's plugin array
  $docsify = $docsify || {};
  $docsify.plugins = [].concat(myPlugin, $docsify.plugins || []);
})();