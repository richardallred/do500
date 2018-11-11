#!/bin/sh
cp -a inventory_idm galaxy
docker run -u `id -u` \
      -v $HOME/.ssh/glsdemo2.pem:/opt/app-root/src/.ssh/id_rsa:Z \
      -v $HOME/Sources/do500/galaxy/:/tmp/src:Z \
      -v $HOME/aws-credentials.csv:/opt/app-root/src/aws-credentials.csv:Z \
      -e INVENTORY_DIR=/tmp/src/inventory_idm/ \
      -e PLAYBOOK_FILE=/tmp/src/casl-ansible/galaxy/infra-ansible/playbooks/provision-idm-server/main.yml \
      -e OPTS="-e aws_key_name=glsdemo2" -t \
      redhatcop/casl-ansible 
