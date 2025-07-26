interface DefautlBtnInterface{
    value:string
    onPress?:React.MouseEventHandler
    disabled?:boolean
}

export default function DefaultBtn({value,onPress,disabled}:DefautlBtnInterface){
    return(
        <button className={`
        w-full 
        h-auto 
        p-2.5 
        text-xl 
        bg-BlueWhale rounded-lg 
        drop-shadow-MainText shadow-2xl 
        text-Snow transition-colors
        ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-blue-700'}
        `}
        onClick={onPress}
        disabled={disabled}
        >{value}</button>
    )
}