import { Store as Pullstate } from "pullstate";
import { Activity, Kategory } from "../app/(tabs)/events";

export const Store = new Pullstate({
    draggingEnabled: false,
    kategories: [] as Kategory[],
    activities: [] as Activity[]
});