import {create} from "zustand";
import {TreeCollectionType} from "@/models/tree.model.ts";

interface SidebarStore {
    tree: TreeCollectionType[]
    openTabs: string[]
    seedTree: string
    searchTerm: string
    setSearchTerm: (seed: string) => void
    setSeedTree: (seed: string) => void
    setTree: (tree: TreeCollectionType[]) => void
    setOpenTabs: (tabs: string[]) => void
    addTab: (tab: string) => void
    removeTab: (tab: string) => void
}

export const useStore = create<SidebarStore>((set) => ({
    tree: [],
    setTree: (val: TreeCollectionType[]) => set({tree:val}),

    seedTree: '',
    setSeedTree: (val: string) => set({seedTree:val}),

    searchTerm: '',
    setSearchTerm: (val: string) => set({seedTree:val}),

    openTabs: [],
    setOpenTabs: (openTabs: string[]) => set({openTabs: openTabs}),
    addTab: (val: string) => set((state) => ({openTabs: [...state.openTabs, val]})),
    removeTab: (val: string) => set((state) => ({openTabs: state.openTabs.filter((tab) => tab !== val)})),
}));