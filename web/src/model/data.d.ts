export interface BaseDetail {
    name: string
    createTime: string
}

export interface Search {
    search?: string
}

export interface PageModel {
    pageCurrent?: number
    pageSize?: number
    total?: number
}