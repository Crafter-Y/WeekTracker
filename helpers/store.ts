import { Store as Pullstate } from "pullstate";
import { Activity, Category } from "../app/(tabs)/events";

export const Store = new Pullstate({
    draggingEnabled: false,
    categories: [] as Category[],
    activities: [] as Activity[]
});