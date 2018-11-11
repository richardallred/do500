#!/bin/sh
docker run -u `id -u` \
      -v $HOME/.ssh/glsdemo2.pem:/opt/app-root/src/.ssh/id_rsa:Z \
      -v $HOME/Sources/do500/classroom/galaxy/:/tmp/src:Z \
      -v $HOME/aws-credentials.csv:/opt/app-root/src/aws-credentials.csv:Z \
      -e INVENTORY_DIR=/tmp/src/casl-ansible/inventory/do500.aws.d/inventory/ \
      -e OPTS="-e aws_key_name=glsdemo2" \
      -e PLAYBOOK_FILE=/tmp/src/casl-ansible/playbooks/openshift/delete-cluster.yml -it \
      redhat-cop/casl-ansible
