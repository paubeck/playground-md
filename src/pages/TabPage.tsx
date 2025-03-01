import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {useContext, useEffect, useState} from "react";
import {Save, X} from "lucide-react";
import {PocketBaseContext} from "@/lib/pocketbase.ts";
import {ItemCollectionType} from "@/models/tree.model.ts";
import {Button} from "@/components/ui/button.tsx";
import MDEditor from '@/components/markdown/Editor';
import {useStore} from "@/store/stateStore.ts";
import {toast} from "sonner";
import {Separator} from "@/components/ui/separator.tsx";

export function TabPage() {
    const pb = useContext(PocketBaseContext)

    const openTabs = useStore((state) => state.openTabs)
    const removeTab = useStore((state) => state.removeTab)

    const [tabItems, setTabItems] = useState<ItemCollectionType[]>([]);
    const [openVal, setOpenVal] = useState<string>();
    const [mdDoc, setMdDoc] = useState('')

    useEffect(() => {
        console.log(openTabs)
        openTabs.length > 0 ?
            pb.collection('Item').getFullList<ItemCollectionType>({filter: `"%${openTabs}%"~id` })
                .then((result) => {
                    setTabItems(result.sort(function(a, b){
                        return openTabs.indexOf(a.id) - openTabs.indexOf(b.id)}))
                    setOpenVal(result[0].id)
                    setMdDoc(result[0].document)
                })
            :
            setTabItems([])
    }, [openTabs, pb]);

    const saveDoc = (item: ItemCollectionType) => {
        pb.collection('Item').update(item.id, Object.assign(item, {document: mdDoc}))
            .then(() => toast.success('Document saved.'))
            .catch((err) => toast.error(JSON.stringify(err)));
    }

    const onValChange = (value: string)=> {
        setOpenVal(value)
        setMdDoc(tabItems.filter((val) => val.id === value).pop()?.document ?? '')
    }

    if(tabItems.length == 0) {
        return (
            <></>
        )
    }

    return (
        <>
            <Tabs defaultValue={openTabs[0]} value={openVal} onValueChange={onValChange} className="w-full h-full flex flex-col">
                <TabsList className='w-full [column-rule: solid 1px]'>
                    {tabItems.map((item, index) => (
                        <>
                            <TabsTrigger value={item.id} className='group/trigger min-w-36' key={`${Math.random()}`}>
                                <div className='flex w-full'>
                                    {item.title}
                                    <Button
                                        variant='ghost'
                                        className='ml-auto p-0 rounded-none h-max group-data-[state=inactive]/trigger:hidden'
                                        onClick={() => {
                                            removeTab(item.id)
                                            setOpenVal(openTabs[0])
                                        }}
                                    >
                                        <X className='h-5 w-5'/>
                                    </Button>
                                </div>
                            </TabsTrigger>
                            {index < (tabItems.length - 1) &&
                                <Separator orientation='vertical' className='mx-1 h-2/3 bg-black/40' />
                            }
                        </>
                    ))}
                </TabsList>
                {tabItems.map((item) => (
                    <div className='flex flex-col justify-center'>

                        <TabsContent value={item.id} className='h-[82svh]'>
                            <div className='flex w-full'>
                                <Button
                                    className='w-max my-3 mr-3 items-center gap-3 flex px-4'
                                    onClick={() => saveDoc(item)}
                                >
                                    <Save/>
                                    Sichern
                                </Button>
                            </div>
                            <MDEditor
                                value={mdDoc}
                                onChange={(val) => setMdDoc(val ?? '')}
                                className='h-full border-l border-t'
                                documentId={item.id}
                            />
                            {/*<Separator className='w-11/12 my-9 mx-auto'/>
                            <MDEditor.Markdown className='p-3' source={mdDoc} style={{whiteSpace: 'pre-wrap'}}/>*/}
                        </TabsContent>
                    </div>
                ))}
            </Tabs>
        </>
    )
}