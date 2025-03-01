import { Search } from "lucide-react"
import { Label } from "@/components/ui/label"
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarInput,
} from "@/components/ui/sidebar"
import {useStore} from "@/store/stateStore.ts";

export function SearchForm() {
    const setSearchTerm = useStore((state) => state.setSearchTerm)

    return (
        <SidebarGroup className="py-0">
            <SidebarGroupContent className="relative">
                <Label htmlFor="search" className="sr-only">
                    Search
                </Label>
                <SidebarInput
                    id="search"
                    placeholder="Search the docs..."
                    className="pl-8"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
            </SidebarGroupContent>
        </SidebarGroup>
    )
}
