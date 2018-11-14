#!/bin/bash

# Scripts that will run in OpenShift. Stored here for convenience etc.
set -o xtrace
set -e

# VARS
USER_PREFIX=<YOUR_NAME>
PIPELINES_NAMESPACE=${USER_PREFIX}-ci-cd
NAME=todolist-fe
NEXUS_ENDPOINT=nexus-${PIPELINES_NAMESPACE}.<YOUR_DOMAIN>

# oc-deploy takes a param of the target env to deploy to ie `oc-deploy dev` or `oc-deploy test` 
oc-deploy() {
    NAMESPACE=${USER_PREFIX}-${1}
    oc project ${NAMESPACE}
    oc tag ${PIPELINES_NAMESPACE}/${NAME}:${BUILD_TAG} ${NAMESPACE}/${NAME}:${BUILD_TAG}
    oc set env dc ${NAME} NODE_ENV=dev
    oc set image dc/${NAME} ${NAME}=docker-registry.default.svc:5000/${NAMESPACE}/${NAME}:${BUILD_TAG}
    oc rollout latest dc/${NAME}
}

oc-build() {
    # get the binary from previous build
    rm -rf package-contents*
    curl -v -f http://admin:admin123@${NEXUS_ENDPOINT}/repository/zip/com/redhat/todolist/${BUILD_TAG}/package-contents.zip -o package-contents.zip
    unzip package-contents.zip

    oc project ${PIPELINES_NAMESPACE} # probs not needed
    oc patch bc ${NAME} -p "spec:
    output:
        to:
        kind: ImageStreamTag
        name: '${NAME}:${BUILD_TAG}'"
    oc start-build ${NAME} --from-dir=package-contents/ --follow
}