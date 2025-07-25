interface DefautlBtnInterface{
    value:string
    onPress?:React.MouseEventHandler
}

export default function DefaultBtn({value,onPress}:DefautlBtnInterface){
    return(
        <button className="
        w-full 
        h-auto 
        p-2.5 
        text-xl 
        bg-BlueWhale rounded-lg 
        drop-shadow-MainText shadow-2xl 
        text-Snow transition-colors
        cursor-pointer
        hover:bg-blue-700
        "
        onClick={onPress}
        >{value}</button>
    )
}