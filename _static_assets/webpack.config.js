module.exports = {
    entry: {
        bundle: './scripts/app-entry.js',
        jobs: './scripts/jobs-entry.js',
        donorList: './scripts/donor-list-entry.js',
        driverList: './scripts/driver-list-entry.js',
        job: './scripts/job-entry.js',
        driverJob: './scripts/driver-job-entry.js'
    },
    output: {
        path: "../scripts",
        filename: '[name].js'
    },
    module: {
        loaders: [
            // { test: /\.less$/, loader: "less-loader!style-loader!css-loader" },
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.jsx?$/, loader: "jsx-loader" }
            // { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&minetype=application/font-woff" },
            // { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&minetype=application/octet-stream" },
            // { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file" },
            // { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&minetype=image/svg+xml" }
        ]
    }
};
