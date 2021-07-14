import {BaseDetail} from "@/model/data";

export interface Detail extends BaseDetail {
    phase: string
    accessMode: string
    capacity: string
    storageType: string
}

export interface Search {
    search?: string
}