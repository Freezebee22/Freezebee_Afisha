const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/index.tsx', // точка входа
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js',
            publicPath: '/', // важно для React Router
            clean: true,
        },
    mode: 'development', // заменить на 'production' при сборке
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    devServer: {
        static: {
        directory: path.join(__dirname, 'dist'),
        },
        historyApiFallback: true, // чтобы SPA работало с React Router
        port: 8000,
        open: true, // сайт будет открываться сам при запуске npm run dev
        hot: true,
        compress: true, // это ускорит загрузку в режиме разработки
    },
    module: {
        rules: [
        {
            test: /\.[tj]sx?$/,
            use: [
                {
                    loader: 'ts-loader',
                },
            ], // для того чтобы ts-loader корректно отработал нам нужен tsconfig его можно создать вручную, а можно создать автоматически
            /** чтобы проиницилизовать его автоматически можно установить пакет typesctipt глобально или использовать npx выполнив команду npx tsc --init
            После создания конфига нужно включить "allowJs": true, чтобы работать не только c typescript, также меняем "jsx": "react" чтобы мы могли работать с react компонентами и включаем карту ресурсов "sourceMap": true, пока на этом все вернемся в этот конфиг позже*/
            exclude: /node_modules/,
        },
        {
            test: /\.module\.css$/, // Обрабатываем файлы с расширением .module.css
            use: [
                "style-loader",
                {
                loader: "css-loader",
                options: {
                    modules: true, // Активируем поддержку CSS-модулей
                    esModule: false,
                },
                },
            ],
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
            exclude: /\.module\.css$/,
        },
        {
            test: /\.(png|jpg|jpeg|gif)$/i, // поддержка изображений
            type: 'asset/resource',
            exclude: /\.svg$/,
        },
        {
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: [
            {
                loader: '@svgr/webpack',
                options: {
                    exportType: 'named',
                },
            },
  ],
        }

        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html', // шаблон HTML
            favicon: false //'./public/favicon.ico', // если есть
        }),
        new CleanWebpackPlugin(),
        new Dotenv(),
    ],
};
