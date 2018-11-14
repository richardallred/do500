

# OpenShift Applier for App

This is an OpenShift applier inventory. I'm assuming you know how to do that, else see the CI/CD repo for docs. 

# Usage

Right now limited to using ansible on your localhost.
1. `[.openshift-applier]$ ansible-galaxy install -r requirements.yml --roles-path=roles --f`

1. `[.openshift-applier]$ ansible-playbook apply.yml -i inventory/`

See the inventory for the filter tag options.