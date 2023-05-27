// next.config.js
module.exports = {
    async headers() {
        return [
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
