import yaml from 'js-yaml'


export const getValue = (value: {}) => {
    return yaml.dump(JSON.parse(JSON.stringify(value)), {noRefs: true})
}
