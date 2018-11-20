#!/bin/sh
source ./env.sh
cp -a inventory_idm galaxy
cp ansible.cfg galaxy/casl-ansible/
docker run -u `id -u` \
      -v $HOME/.ssh/glsdemo2.pem:/opt/app-root/src/.ssh/id_rsa:Z \
      -v $HOME/Sources/do500/classroom/galaxy/:/tmp/src:Z \
      -v $HOME/aws-credentials.csv:/opt/app-root/src/aws-credentials.csv:Z \
      -e IDM_DM_PASSWORD=$IDM_DM_PASSWORD \
      -e IDM_ADMIN_PASSWORD=$IDM_ADMIN_PASSWORD \
      -e ANSIBLE_CONFIG=/tmp/src/casl-ansible/ansible.cfg \
      -e INVENTORY_DIR=/tmp/src/inventory_idm \
      -e PLAYBOOK_FILE=/tmp/src/casl-ansible/galaxy/infra-ansible/playbooks/provision-idm-server/main.yml \
      -e OPTS="-e aws_key_name=glsdemo2" -it \
      quay.io/redhat-cop/casl-ansible
