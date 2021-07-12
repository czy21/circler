import {get,} from 'lodash'
import * as yaml from './yaml'
import objectMapper from './object.mapper'

export const getResourceCreator = (item: any) =>
    get(item, 'metadata.annotations.creator') ||
    ''

export const getDescription = (item: any) =>
    get(item, 'metadata.annotations.desc') ||
    ''

export const getAliasName = (item: any) =>
    get(item, 'metadata.annotations.displayName') ||
    ''

export {
    yaml,
    objectMapper
}