import { http } from "./http"

export const getPhonetic = async (word: string, type: string) => {
    return await http.post(type, { word });
}