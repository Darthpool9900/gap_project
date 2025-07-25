import { MouseEventHandler } from "react";
import { Plus } from "phosphor-react";

interface AddBtnProps{
    onPress?:MouseEventHandler
}


export default function AddBtn({onPress}:AddBtnProps){
    return(
        <button className="size-20 bg-BlueWhale drop-shadow-2xl shadow-MainText fixed z-50 right-16 bottom-10
        flex justify-center items-center rounded-full transition-colors hover:bg-blue-500 cursor-pointer
        " onClick={onPress}>
            <Plus size={48} color={"white"}/>
        </button>
    )
}