import {FilePlus, FolderPlus, Plus, Save} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useContext, useState} from "react";
import {PocketBaseContext} from "@/lib/pocketbase.ts";
import {ItemCollectionType, TreeCollectionType} from "@/models/tree.model.ts";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import {cn} from "@/lib/utils.ts";
import {toast} from "sonner";
import {useStore} from "@/store/stateStore.ts";

const KnotenSwitch = React.forwardRef<React.ElementRef<typeof SwitchPrimitives.Root>, React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>>(({ className, ...props }, ref) => (
        <SwitchPrimitives.Root
            className={cn(
                "relative peer inline-flex h-8 w-16 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-primary",
                className
            )}
            {...props}
            ref={ref}
        >
            <SwitchPrimitives.Thumb
                className={cn(
                    "z-20 pointer-events-none flex h-7 w-7 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-8 data-[state=unchecked]:translate-x-0"
                )}
            />
            <FolderPlus className='absolute size-5 right-1.5 stroke-input'/>
            <FilePlus className='absolute size-5 left-1.5 stroke-input'/>
        </SwitchPrimitives.Root>
    )
)

interface TreeItemDialogProps {
    parentId: string
}

export function TreeItemDialog({parentId}: TreeItemDialogProps) {
    const [checked, setChecked] = useState(true);
    const [title, setTitle] = useState<string>("");
    const setSeedTree = useStore((state) => state.setSeedTree)
    const pb = useContext(PocketBaseContext)

    const create = () => {
        if (checked) {
            pb.collection<ItemCollectionType>('Item')
                .create<ItemCollectionType>({
                    content: "",
                    description: "",
                    document: "",
                    title: title
                })
                .then((res) => {
                    pb.collection<TreeCollectionType>('Tree')
                        .getOne<TreeCollectionType>(parentId)
                        .then((resres) => {
                            pb.collection<TreeCollectionType>('Tree')
                                .update<TreeCollectionType>(
                                    parentId,
                                    {
                                        item: [...resres.item, res.id]
                                    }
                                )
                                .then(() => {
                                    toast.success("Dokument angelegt!")
                                    setTimeout(() => setSeedTree(`${Math.random()}`), 500)
                                })
                                .catch((err) => {
                                    toast.error("Item error!");
                                    console.log(err)
                                })
                        })
            })
        } else {
            pb.collection<TreeCollectionType>('Tree')
                .getOne<TreeCollectionType>(parentId)
                .then((res) => {
                    pb.collection<TreeCollectionType>('Tree')
                        .create<TreeCollectionType>({
                            title: title,
                            parent: res.id,
                            item: []
                        })
                        .then(() => {
                            toast.success("Ordner angelegt!")
                            setTimeout(() => setSeedTree(`${Math.random()}`), 500)
                        })
                        .catch((err) => {
                            toast.error("Item error!");
                            console.log(err)
                        })
                })
        }
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className='w-7 h-7 p-0 hover:bg-primary/30' variant='ghost'>
                    <Plus className='h-4 w-4'/>
                </Button>
            </PopoverTrigger>
            <PopoverContent side='right' className='flex flex-col gap-3'>
                <h2 className='text-lg font-semibold tracking-wide'>Datei / Ordner anlegen</h2>
                <div className="flex gap-3 items-center w-full justify-center">
                    <KnotenSwitch
                        id="airplane-mode"
                        className='bg-secondary' defaultChecked
                        onCheckedChange={(checked: boolean) => {
                            setChecked(checked)
                        }}
                    />
                    <Input placeholder='Name' className='w-full' onChange={(e) => setTitle(e.target.value)}/>
                    <Button className='h-9 w-9 px-1.5' onClick={() => create()}>
                        <Save className='h-5'/>
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}