import {get, omit,} from 'lodash'
import moment from "moment";

const getResourceCreator = (item: any) => get(item, 'metadata.annotations.creator') || ''

const getDescription = (item: any) => get(item, 'metadata.annotations.desc') || ''

const getAliasName = (item: any) => get(item, 'metadata.annotations.displayName') || ''

const getOriginData = (item: any) =>
    omit(item, [
        'status',
        'metadata.uid',
        'metadata.selfLink',
        'metadata.generation',
        'metadata.ownerReferences',
        'metadata.resourceVersion',
        'metadata.creationTimestamp',
        'metadata.managedFields',
    ])

const getBaseInfo = (item: any) => ({
    id: get(item, 'metadata.uid'),
    name: get(item, 'metadata.name'),
    creator: getResourceCreator(item),
    description: getDescription(item),
    aliasName: getAliasName(item),
    createTime: moment(get(item, 'metadata.creationTimestamp')).format("yyyy-MM-DD HH:mm:ss"),
    resourceVersion: get(item, 'metadata.resourceVersion'),
})

const getVolumePhase = (item: any) => {
    const phase = get(item, 'status.phase')
    const deletionTime = get(item, 'metadata.deletionTimestamp')

    if (deletionTime) {
        return 'Terminating'
    }

    return phase
}

export const volume = (item: any) => {
    return {
        ...getBaseInfo(item),
        phase: getVolumePhase(item),
        namespace: get(item, 'metadata.namespace'),
        status: get(item, 'status', {}),
        conditions: get(item, 'status.conditions', []),
        labels: get(item, 'metadata.labels'),
        annotations: get(item, 'metadata.annotations'),
        accessMode: get(item, 'spec.accessModes[0]'),
        accessModes: get(item, 'spec.accessModes'),
        storageClassName: get(item, 'spec.storageClassName'),
        resources: get(item, 'spec.resources'),
        capacity: get(
            item,
            'status.capacity.storage',
            get(item, 'spec.resources.requests.storage')
        ),
        storageProvisioner: get(
            item,
            'metadata.annotations["volume.beta.kubernetes.io/storage-provisioner"]'
        ),
        type: 'pvc',
        _originData: getOriginData(item),
    }
}

export const configmap = (item: any) => ({
    ...getBaseInfo(item),
    namespace: get(item, 'metadata.namespace'),
    labels: get(item, 'metadata.labels', {}),
    annotations: get(item, 'metadata.annotations', {}),
    data: get(item, 'data', {}),
    _originData: getOriginData(item),
})

export const getLastApplyConfig = (item: {}) => {
    return JSON.parse(get(item, 'metadata.annotations["kubectl.kubernetes.io/last-applied-configuration"]'))
}