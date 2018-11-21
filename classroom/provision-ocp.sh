#!/bin/bash
source ./env.sh
cp ansible.cfg galaxy/casl-ansible/
rm -fr galaxy/casl-ansible/inventory/do500.aws.d
mkdir -p galaxy/casl-ansible/inventory/do500.aws.d
cp -a galaxy/casl-ansible/inventory/sample.aws.example.com.d/* galaxy/casl-ansible/inventory/do500.aws.d/
cp -a inventory_ocp/* galaxy/casl-ansible/inventory/do500.aws.d/inventory/
docker run -u `id -u` \
      -v $HOME/.ssh/glsdemo2.pem:/opt/app-root/src/.ssh/id_rsa:Z \
      -v $HOME/Sources/do500/classroom/galaxy/:/tmp/src:Z \
      -v $HOME/aws-credentials.csv:/opt/app-root/src/aws-credentials.csv:Z \
      -e RHSM_USER=$RHSM_USER \
      -e RHSM_PASSWD=$RHSM_PASSWD \
      -e RHSM_POOL=$RHSM_POOL \
      -e REG_USERNAME=$REG_USERNAME \
      -e REG_TOKEN=$REG_TOKEN \
      -e ANSIBLE_CONFIG=/tmp/src/casl-ansible/ansible.cfg \
      -e INVENTORY_DIR=/tmp/src/casl-ansible/inventory/do500.aws.d/inventory \
      -e PLAYBOOK_FILE=/tmp/src/casl-ansible/playbooks/openshift/end-to-end.yml \
      -e OPTS="-e aws_key_name=glsdemo2" -t \
      quay.io/redhat-cop/casl-ansible
