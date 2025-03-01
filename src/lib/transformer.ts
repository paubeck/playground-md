import {Item, Tree, TreeCollectionType} from "@/models/tree.model.ts";

function slugify(str: string) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim leading/trailing white space
    str = str.toLowerCase(); // convert string to lowercase
    str = str.replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
        .replace(/\s+/g, '-') // replace spaces with hyphens
        .replace(/-+/g, '-'); // remove consecutive hyphens
    return str;
}

function getChildren(data: TreeCollectionType[], parent: TreeCollectionType): Item[] {
    const children = data.filter((item) => item.parent === parent.id);

    if(children.length == 0) {
        return []
    }

    return children.map((item) => {
        return {
            id: item.id,
            title: item.title,
            slug: slugify(item.title),
            url: `/${slugify(parent.title)}/${slugify(item.title)}`,
            items: [
                ...getChildren(data, item),
                ...item.expand?.item?.map((doc): Item => {
                    return {
                        id: doc.id,
                        title: doc.title,
                        slug: slugify(doc.title),
                        url: `/${slugify(parent.title)}/${slugify(item.title)}/${slugify(doc.id)}`,
                    }
                }) ?? []
            ]
        }

    })
}

export function transformTreeData(data: TreeCollectionType[]): Tree {
    const roots = data.filter((item) => (
        item.parent == ''
    ))

    return {
        items: roots.map(root => {
            return {
                id: root.id,
                title: root.title,
                slug: slugify(root.title),
                url: `/${slugify(root.title)}`,
                items: getChildren(data, root)
            }
        })
    }
}