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
oc new-project common
git checkout exercise1/git-nexus templates/gitlab.yml params/gitlab
cat  <<EOF > params/gitlab
LDAP_BIND_DN=uid=git,cn=users,cn=accounts,dc=${env_id},dc=nextcle,dc=com
LDAP_USER_FILTER=(memberOf=cn=users,cn=groups,cn=accounts,dc=${env_id},dc=nextcle,dc=com)
LDAP_PASSWORD=redhat123
LDAP_HOST=idm.${env_id}.nextcle.com
LDAP_BASE=cn=users,cn=accounts,dc=${env_id},dc=nextcle,dc=com
LDAP_LABEL="Residency Labs LDAP"
GITLAB_ROOT_PASSWORD=admin123
GITLAB_DATA_VOL_SIZE=2Gi
POSTGRESQL_VOL_SIZE=1Gi
APPLICATION_HOSTNAME=gitlab.apps.${env_id}.nextcle.com
NAMESPACE=common
EOF
cat <<EOF >inventory/host_vars/ci-cd-tooling.yml
---
ansible_connection: local
openshift_cluster_content:
- object: ci-cd-tooling
  content:
  - name: "gitlab"
    namespace: "common"
    template: "{{ playbook_dir }}/templates/gitlab.yml"
    params: "{{ playbook_dir }}/params/gitlab"
    tags:
    - gitlab
EOF
ansible-playbook apply.yml -e target=tools \
  -i inventory/ \
  -e "filter_tags=gitlab"
