module.exports = {
    aws_table_name: 'Cars',
    aws_local_config: {
        region: 'local',
        endpoint: 'http://localhost:8000'
    },
    aws_remote_config: {
        region: 'us-east-1',
    }
};
