import { TOGGLEFALSE , TOGGLETRUE } from "./actionIdentifiers"


export const toggleFalse = () => {
    return{
        type : TOGGLEFALSE
    }
}

export const toggleTrue = () => {
    return{
        type : TOGGLETRUE
    }
}