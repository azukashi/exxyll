module.exports = {
    apps: [
        {
            name: 'exxyll',
            script: './index.js',
            exec_mode: 'fork',
            exp_backoff_restart_delay: 100,
            watch: true,
        },
    ],
};
