/*
* PostCSS is a tool for transforming styles with JS plugins.
* These plugins can lint your CSS, support variables and mixins, transpile future CSS syntax, inline images, and more.
* https://github.com/postcss/postcss
*/

const autoprefixer = require('autoprefixer');

module.exports = {
    plugins: [
       autoprefixer({
            browsers: '> 1%, last 2 versions'
        }),
    ]
};
