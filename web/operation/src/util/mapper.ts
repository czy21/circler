import stub from '@/init'

const getResourceCreator = (item: any) => stub.ref.lodash.get(item, 'metadata.annotations.creator') || ''

const getDescription = (item: any) => stub.ref.lodash.get(item, 'metadata.annotations.desc') || ''

const getAliasName = (item: any) => stub.ref.lodash.get(item, 'metadata.annotations.displayName') || ''

const getOriginData = (item: any) =>
    stub.ref.lodash.omit(item, [
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
    id: stub.ref.lodash.get(item, 'metadata.uid'),
    name: stub.ref.lodash.get(item, 'metadata.name'),
    creator: getResourceCreator(item),
    description: getDescription(item),
    aliasName: getAliasName(item),
    createTime: stub.ref.moment(stub.ref.lodash.get(item, 'metadata.creationTimestamp')).format("yyyy-MM-DD HH:mm:ss"),
    resourceVersion: stub.ref.lodash.get(item, 'metadata.resourceVersion'),
})

const getVolumePhase = (item: any) => {
    const phase = stub.ref.lodash.get(item, 'status.phase')
    const deletionTime = stub.ref.lodash.get(item, 'metadata.deletionTimestamp')

    if (deletionTime) {
        return 'Terminating'
    }

    return phase
}

export const volume = (item: any) => {
    return {
        ...getBaseInfo(item),
        phase: getVolumePhase(item),
        namespace: stub.ref.lodash.get(item, 'metadata.namespace'),
        status: stub.ref.lodash.get(item, 'status', {}),
        conditions: stub.ref.lodash.get(item, 'status.conditions', []),
        labels: stub.ref.lodash.get(item, 'metadata.labels'),
        annotations: stub.ref.lodash.get(item, 'metadata.annotations'),
        accessMode: stub.ref.lodash.get(item, 'spec.accessModes[0]'),
        accessModes: stub.ref.lodash.get(item, 'spec.accessModes'),
        storageClassName: stub.ref.lodash.get(item, 'spec.storageClassName'),
        resources: stub.ref.lodash.get(item, 'spec.resources'),
        capacity: stub.ref.lodash.get(
            item,
            'status.capacity.storage',
            stub.ref.lodash.get(item, 'spec.resources.requests.storage')
        ),
        storageProvisioner: stub.ref.lodash.get(
            item,
            'metadata.annotations["volume.beta.kubernetes.io/storage-provisioner"]'
        ),
        type: 'pvc',
        _originData: getOriginData(item),
    }
}

export const configmap = (item: any) => ({
    ...getBaseInfo(item),
    namespace: stub.ref.lodash.get(item, 'metadata.namespace'),
    labels: stub.ref.lodash.get(item, 'metadata.labels', {}),
    annotations: stub.ref.lodash.get(item, 'metadata.annotations', {}),
    data: stub.ref.lodash.get(item, 'data', {}),
    _originData: getOriginData(item),
})

export const getLastApplyConfig = (item: {}) => {
    return JSON.parse(stub.ref.lodash.get(item, 'metadata.annotations["kubectl.kubernetes.io/last-applied-configuration"]'))
}