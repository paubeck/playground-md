import * as React from "react"
import {ArrowRight, ChevronDown, File, Folder} from "lucide-react"
import { SearchForm } from "@/components/SearchFormSidebar.tsx"
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible"
import {Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarRail} from "@/components/ui/sidebar"
import {Item, Tree} from "@/models/tree.model.ts";
import {Button} from "@/components/ui/button.tsx";
import {useStore} from "@/store/stateStore.ts";
import {TreeItemDialog} from "@/components/TreeItemDialog.tsx";
import {useEffect, useState} from "react";

type AppSidebarProps = {
    data: Tree
}

export function AppSidebar({data,  ...props }: AppSidebarProps & React.ComponentProps<typeof Sidebar>) {
    console.log(data)

    const addTab = useStore((state) => state.addTab)
    const searchTerm = useStore((state) => state.searchTerm)

    const [sidebarData, setSidebarData] = useState<string>('')

    useEffect(() => {
        setSidebarData(`${Math.random()}`)
    }, [searchTerm, data]);

    function displayItems(items: Item[]) {
        return (
            items.map((element) => (
                element.items ?
                    <Collapsible key={element.title} title={element.title} defaultOpen className='group/collapsible'>
                        <SidebarGroup>
                            <SidebarGroupLabel asChild className="group/label mx-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                                <div className='flex flex-row items-center gap-1'>
                                    <Folder className='h-4 stroke-muted-foreground'/>
                                    <div className='pb-0.5'>
                                        {element.title}
                                    </div>
                                    <div className='flex ml-auto items-center'>
                                        <TreeItemDialog parentId={element.id} />
                                        <CollapsibleTrigger asChild>
                                            <Button variant='ghost' className='w-7 h-7 p-0'>
                                                <ChevronDown className='ml-auto w-5 h-5 transition-transform'/>
                                            </Button>
                                        </CollapsibleTrigger>
                                    </div>
                                </div>
                            </SidebarGroupLabel>
                            <CollapsibleContent>
                                <SidebarGroupContent>
                                    <SidebarMenuSub className='gap-2 w-[95%]'>
                                        {displayItems(element.items)}
                                    </SidebarMenuSub>
                                </SidebarGroupContent>
                            </CollapsibleContent>
                        </SidebarGroup>
                    </Collapsible>
                    :
                    <SidebarMenuSubItem key={element.title} className='list-none'>
                        <div className='flex min-w-0 flex-col w-full'>
                            <SidebarMenuSubButton asChild className='h-8'>
                                <Button
                                    variant='ghost'
                                    className={`flex h-8 text-left px-2 mx-2 ${(element.title.includes(searchTerm) && searchTerm !== '') ? 'bg-red-500/50': ''}`}
                                    onClick={() => addTab(element.id)}
                                >
                                    <div className='flex flex-row items-center gap-1 w-full'>
                                        <File className='h-4 stroke-muted-foreground' />
                                        <div className='h-full pb-0.5'>
                                            {element.title}
                                        </div>
                                    </div>
                                    <ArrowRight className='h-4 stroke-muted-foreground'/>
                                </Button>
                            </SidebarMenuSubButton>
                        </div>
                    </SidebarMenuSubItem>
            ))
        )
    }

    return (
        <Sidebar {...props} id={sidebarData}>
            <SidebarHeader>
                <div className='flex'>
                    <div className='text-2xl'>Playground</div>
                </div>
                <SearchForm />
            </SidebarHeader>
            <SidebarContent className="gap-3">
                {displayItems(data.items)}
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}
