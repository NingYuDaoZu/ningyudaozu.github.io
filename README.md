# 个人博客

托管在 GitHub Pages 上的静态站点，无框架、无构建步骤。

- 站点地址：<https://ningyudaozu.github.io>
- 仓库地址：<https://github.com/NingYuDaoZu/ningyudaozu.github.io>

---

## 文件结构

```
blog/
├── index.html            首页
├── archive.html          归档
├── about.html            关于
├── 404.html              404 页面
├── feed.xml              RSS
├── sitemap.xml           站点地图
├── robots.txt            爬虫规则
├── .nojekyll             禁用 GitHub Pages 的 Jekyll 处理
├── assets/
│   ├── css/style.css     样式（配色、排版、深浅色主题）
│   ├── js/main.js        主题切换、代码块复制
│   └── img/              图标与配图
└── posts/                文章目录，一篇一个 HTML 文件
```

`.nojekyll` 不能删。缺少它时 GitHub Pages 会对仓库执行 Jekyll 构建，可能报错。

---

## 部署

```bash
git add -A
git commit -m "update"
git push
```

推送后 GitHub Pages 自动重新构建，约 1 分钟后生效。

没有 Git 时可以用网页上传：仓库页面 → **Add file → Upload files**，把本目录下的内容
（不是目录本身）拖进去提交。注意网页上传默认不包含 `.` 开头的文件，`\.nojekyll`
需要单独用 **Create new file** 创建。

---

## 新增文章

1. 复制 `posts/` 下任意一篇，改文件名和正文。
2. 需要改动的位置：
   - `<title>`、`<h1 class="post-head__title">` — 标题
   - `<meta name="description">` — 摘要，会进入 RSS 和搜索结果
   - `<time datetime="...">` — 发布日期
   - `<article class="article">` — 正文
   - 文末的 `post-nav` — 上一篇 / 下一篇
3. 同步更新三个列表：
   - `index.html` 的 `<ol class="posts">`
   - `archive.html` 的 `.archive-list`
   - `feed.xml` 的 `<channel>`
4. 首页和归档页顶部的文章计数需要手动改。

可用的排版元素见 [`posts/typography.html`](posts/typography.html)。

---

## 自定义内容

| 项目 | 位置 |
| --- | --- |
| 站点名、作者名 | 各 HTML 的 `<a class="brand">` 与 `<title>` |
| 简介 | `index.html` 的 `.hero__lede` |
| 个人介绍 | `about.html` |
| GitHub 链接 | `index.html` 的 `.hero__links`、`about.html` 的 `.contact-list`、页脚 |
| 站点地址 | `feed.xml`、`sitemap.xml`、`robots.txt` |
| 头像 | `assets/img/avatar.svg`，可替换为照片，注意同步修改引用路径 |
| 配色 | `assets/css/style.css` 顶部 `:root` 中的变量 |

配色变量有浅色、深色两组。修改 `--accent` 可更换主色，链接、标记、按钮会同步生效。

---

## 其他说明

- 深浅色主题默认跟随系统，可手动切换，偏好保存在 `localStorage` 的 `blog-theme`。
- 不加载外部字体，使用系统字体栈。
- 无统计脚本，不采集访问数据。
- 打印时自动隐藏页头、页脚和导航。
