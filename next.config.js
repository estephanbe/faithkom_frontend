// next.config.js
module.exports = {
    async headers() {
        return [
            // {
            //     basePath: 'http://faithkom.com',
            // },
            {
                distDir: 'build',
            },
            {
                source: '/robots.txt',
                headers: [
                    {
                        key: 'Content-Type',
                        value: 'text/plain',
                    },
                ],
            },
        ];
    },
};
