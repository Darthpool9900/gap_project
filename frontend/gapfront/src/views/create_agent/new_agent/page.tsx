import { useNavigate } from "react-router-dom";
import DefaultInput from "../../../components/inputs/DefaultInput";
import DefaultBtn from "../../../components/butttons/DefaultBtn";

export default function NewAgentAdd(){

     const navigate= useNavigate();

    const reqCreate= (path:string)=>{
        navigate(path)
    }
    
    return(
        <section className="w-full h-full flex justify-center flex-col items-center">
                    <div className="w-3/5 h-auto flex justify-center flex-col items-start p-8 gap-8">
                    <div className="w-full h-auto flex justify-start">
                        <h1 className="text-4xl text-MainText font-bold">Let’s start with a few infos</h1>
                    </div>
                    <span className="text-2xl text-SubGray w-4/5">Just for use your computer as server, we need just a few infors about the agent.</span>
                    </div>
                    <form className="w-4/6 h-auto flex justify-center items-center flex-col">
                        <div className="w-4/6 h-auto flex flex-col gap-8">
                            <DefaultInput Value="Please insert your server adress" type="text"/>
                            <DefaultInput Value="Insert a name for your agent" type="text"/>
                            <textarea className="bg-Snow rounded-2xl drop-shadow-2xl resize-none h-64">

                            </textarea>
                        </div>
                        <div className="w-1/3 h-auto mt-8">
                        <DefaultBtn onPress={()=>{reqCreate('/create_agent/add_image')}} value="Next"/>
                        </div>
                    </form>
                      <span
                        className="m-2 text-SubGray"
                    >
                        You don’t have one? let with us, we are gonna create with for you click 
                        <button
              onClick={()=>{
                reqCreate('/create_agent')
              }}
              className="appearance-none w-auto h-auto p-1 text-BlueWhale text-base" value={"hear"}>hear</button></span>
                </section>
    )
}