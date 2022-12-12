aws s3 sync build/ s3://looc-web-tests/modelviewer --delete --region eu-central-1

aws cloudfront create-invalidation --distribution-id E1IIJR7ANG8972 --paths "/*"
