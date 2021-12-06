# AWS Lambda Cron Jobs with Node.js, Typescript and Serverless Framework
Project with Node.js, Typescript and Serverless Framework to work as cron jobs.


# Stack
- Node.js;  
- Typescript;  
- Serverless Framework.


## Structure

- `./app/src/functions`: are the functions to be performed by cron;  
- `./app/src/integrations`: there are integrations with other services, APIs, etc;  
- `./serverless.yml`: framework responsible for generating the build and deploy in AWS Lambda.


## Deploy

- Bitbucket pipeline.


## References

- [AWS Node Scheudle Cron Example](https://github.com/serverless/examples/tree/master/aws-node-scheduled-cron)  
- [AWS Node Scheudle Cron Example 2](https://github.com/serverless/examples/tree/master/aws-node-scheduled-weather)  
- [Automating Serverless framework deployments using Bitbucket Pipelines](https://bitbucket.org/blog/automating-serverless-framework-deployments-using-bitbucket-pipelines)
