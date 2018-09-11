{
    "presets": [
        "es2015",
        "stage-2",
        "react"
    ],
    "plugins": [
        ["import-glob"],
        ["transform-runtime"],
        ["transform-async-to-generator"],
        ["react-hot-loader/babel"],
        ["dva-hmr"],
        [
            "import",
            {
              "libraryName": "antd",
              "style": true
            }
        ]
    ]
}
