/**
 * docsify 自定义插件：主题切换
 * 参考文档：https://docsify.js.org/#/zh-cn/write-a-plugin
 */
const themes = ['vue', 'dark'];
const $btn = document.querySelector('a[data-theme]');
const $link = document.querySelector('link[rel]')
let nextThemeLocal = localStorage.getItem("activeTheme");
if (nextThemeLocal != null && nextThemeLocal != "null") changeTheme(nextThemeLocal);

$btn.onclick = function(e) {
  changeTheme();
};

function changeTheme(nextThemeParam) {
  let activeTheme = $btn.attributes['data-theme'].nodeValue;
  let nextTheme = nextThemeParam || themes[themes.length - 1 - themes.indexOf(activeTheme)];
  $btn.attributes['data-theme'].nodeValue = nextTheme;
  localStorage.setItem("activeTheme", nextTheme);
  let activeCssLinkArray = $link.attributes.href.value.split(activeTheme);
  let nextCssLink = activeCssLinkArray[0] + nextTheme + activeCssLinkArray[1];
  $link.attributes.href.value = nextCssLink;
}