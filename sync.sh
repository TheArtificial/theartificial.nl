#!/bin/sh
aws s3 sync build s3://theartificial.nl --region eu-west-1 --acl public-read --delete --exclude "tmp/*" --cache-control "public, max-age=3600"
