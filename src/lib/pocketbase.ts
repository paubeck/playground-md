import PocketBase from 'pocketbase';
import {createContext} from "react";

export const PocketBaseContext = createContext(new PocketBase('https://api.paulbeck.xyz'))
