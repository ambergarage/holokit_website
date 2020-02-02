const isProduction = process.argv.indexOf('production') >= 0;

module.exports = (ctx) => ({
    parser: ctx.parser ? 'sugarss' : false,
    map: !isProduction ? ctx.map : false,
    plugins: {
        'autoprefixer': {
        },
        'postcss-pxtorem': isProduction ? {
            rootValue: 16,
            propList: ['*']
        } : false
    }
});