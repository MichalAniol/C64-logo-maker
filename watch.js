const { watch } = require('gulp');
const browserSync = require('browser-sync').create();

const PORT = 3030
const PROXY_PORT = 3033

browserSync.init({
    server: {
        baseDir: "./prod",
    },
    ui: {
        port: PROXY_PORT
    },
    port: PORT,
    open: false
});

const watchHtml = () => {
    watch([
        'prod/*.html',
        'prod/*.css',
        'prod/*.js',
    ], () => {
        const now = new Date(Date.now());
        const getZero = num => num < 10 ? '0' + num : num;
        const time = now.getFullYear() + '.' + getZero(now.getMonth() + 1) + '.' + getZero(now.getDate()) + ' ' + getZero(now.getHours()) + ':' + getZero(now.getMinutes()) + ':' + getZero(now.getSeconds());
        console.log(' --- DEVELOP reloaded at: ' + time + ' ---');
        browserSync.reload();
        watchHtml();
    });
}
watchHtml();