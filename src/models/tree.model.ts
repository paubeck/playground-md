export interface Tree {
    items: Item[]
}

export interface Item {
    id: string
    title: string
    slug?: string
    url: string
    items?: Item[]
}

export type ItemCollectionType = {
    id: string
    collectionId: string
    collectionName: string
    created: string
    updated: string
    content: string
    description: string
    title: string
    document: string
}

export type TreeCollectionType = {
    collectionId: string
    collectionName: string
    created: string
    expand?: {
        item: ItemCollectionType[]
    }
    id: string
    item: string[]
    parent: string
    title: string
    updated: string
}