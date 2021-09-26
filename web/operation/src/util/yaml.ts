import stub from '@/init'


export const getValue = (value: {}) => {
    return stub.ref.yaml.dump(JSON.parse(JSON.stringify(value)), {noRefs: true})
}
