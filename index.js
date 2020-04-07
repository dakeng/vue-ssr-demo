const Vue = require('vue');
const server = require('express')();
const renderer = require('vue-server-renderer').createRenderer({
    template: require('fs').readFileSync('./template.html', 'utf-8')
});

// 处理路由
server.get('*', (req, res) => {
    const app = new Vue({
        data: {
            url: req.url
        },
        template: '<div>访问的URL是： {{ url }}</div>'
    });

    const context = {
        title: 'Hello'
    };

    renderer.renderToString(app, context, (err, html) => {
        if (err) {
            res.status(500).end('Internal Server Error');
            return ;
        }
        // console.log(html);
        // html是注入应用程序内容后的完整页面
        res.end(html);
    });
});

server.listen(8000);