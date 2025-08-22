import {PanelLeft} from "lucide-react"
import {Toaster} from "@/components/ui/sonner.tsx";
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar.tsx";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {AppSidebar} from "@/components/AppSidebar.tsx";
import {TreeCollectionType} from "@/models/tree.model.ts";
import { PocketBaseContext } from "./lib/pocketbase.ts";
import PocketBase from "pocketbase";
import {LoginForm} from "@/components/Login.tsx";
import {transformTreeData} from "@/lib/transformer.ts";
import {useStore} from "@/store/stateStore.ts";
import {Outlet} from "react-router-dom";

export const App = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const pocketBase = new PocketBase('https://api.paulbeck.xyz')

    const tree = useStore((state) => state.tree)
    const seedTree = useStore((state) => state.seedTree)
    const setTree = useStore((state) => state.setTree)

    useEffect(() => {
        const treeRequest = pocketBase.collection('Tree').getFullList<TreeCollectionType>({expand: 'item,parent'})

        treeRequest
            .then((res) => {
                setTree(res)
                console.log(res)
            })
            .catch(err => console.log(err))
            .finally(() => {console.log(transformTreeData(tree))})
    }, [seedTree]);

    return (
        <PocketBaseContext.Provider value={pocketBase}>
            <div className="grid h-screen w-full">
                <Toaster position={"top-center"} duration={3000} />
                {pocketBase.authStore.isValid ?
                  <SidebarProvider open={sidebarOpen}>
                      <AppSidebar data={transformTreeData(tree)} />
                      <SidebarInset>
                          <div className="relative flex flex-col pt-12 h-svh">
                              <div className='absolute top-2 left-2'>
                                  <Button variant="ghost" onClick={() => setSidebarOpen(!sidebarOpen)}>
                                    <PanelLeft/>
                                  </Button>
                              </div>
                              <main className="flex-1 gap-4 overflow-auto p-4 h-full w-full">
                                  <Outlet />
                              </main>
                          </div>
                      </SidebarInset>
                    </SidebarProvider>
                  :
                  <LoginForm />
                }
          </div>
        </PocketBaseContext.Provider>
    )
}

export default App
