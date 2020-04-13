#!/bin/bash
TARGET_DIR=/data/webroot/product/coupons-front

if [[ $TRAVIS_BRANCH == "master" ]];then
  TARGET_DIR=/data/webroot/test/coupons-front
fi

if [[ $TRAVIS_BRANCH == "tt" ]];then
  TARGET_DIR=/data/webroot/product/wmzs
fi

rsync -r --delete-after --quiet -e "ssh -i ./deploy_key -p 22" ./dist/ root@$SSH_HOST:$TARGET_DIR
