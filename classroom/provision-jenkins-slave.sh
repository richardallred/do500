#!/bin/bash
source ./env.sh
env_id=$ENV_ID
admin_user=$OCP_USERNAME
admin_passwd=$OCP_PASSWORD
mkdir temp
cd temp
#git clone https://github.com/rht-labs/enablement-ci-cd
cp -a ../../labs/enablement-ci-cd .
cd enablement-ci-cd
#./git-pull-all.sh
ansible-galaxy install -r requirements.yml --roles-path=roles
oc login -u ${admin_user} -p ${admin_passwd} https://console.${env_id}.nextcle.com
oc project openshift
#git checkout exercise1/git-nexus templates/gitlab.yml params/gitlab
cat  <<EOF > params/jenkins-slave-npm
SOURCE_CONTEXT_DIR=jenkins-slaves/jenkins-slave-npm
NAME=jenkins-slave-npm
SOURCE_REPOSITORY_REF=v1.2
EOF
cat <<EOF >inventory/host_vars/ci-cd-tooling.yml
---
ansible_connection: local
openshift_cluster_content:
- object: "Jenkins slave npm"
  content:
  - name: "jenkins-slave-npm"
    namespace: "openshift"
    template: "{{ playbook_dir }}/templates/jenkins-slave-generic-template.yml"
    params: "{{ playbook_dir }}/params/jenkins-slave-npm"
    tags:
    - jenkins-slave-npm
EOF
ansible-playbook apply.yml -e target=tools \
  -i inventory/ \
  -e "filter_tags=jenkins-slave-npm"
cd ../../
rm -fr temp
