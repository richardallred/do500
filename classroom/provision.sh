#!/bin/sh
docker run -u `id -u` \
      -v $HOME/.ssh/glsdemo2.pem:/opt/app-root/src/.ssh/id_rsa:Z \
      -v $HOME/Sources/do500/galaxy/:/tmp/src:Z \
      -e RHSM_USER=$RHSM_USER \
      -e RHSM_PASSWD=$RHSM_PASSWD \
      -e RHSM_POOL=$RHSM_POOL \
      -e REG_USERNAME=$REG_USERNAME \
      -e REG_TOKEN=$REG_TOKEN \
      -e AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
      -e AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
      -e INVENTORY_DIR=/tmp/src/casl-ansible/inventory/sample.aws.example.com.d/inventory \
      -e PLAYBOOK_FILE=/tmp/src/casl-ansible/playbooks/openshift/end-to-end.yml \
      -e OPTS="-e aws_key_name=glsdemo2" -t \
      redhatcop/installer-aws
