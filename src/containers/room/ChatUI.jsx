import { useSelector } from "react-redux";
import axiosInstance from "../../axiosInstanceGenerator";
import { lastseen } from "../../const/constsURL";
import ChatDisplay from "./ChatDisplay";
import ChatInput from "./ChatInput";
import ChatMenu from "./ChatMenu";


export default function ChatUI ()  {

    const roomId = useSelector((state) => state.navigation.windowPath.at(-1))
    axiosInstance.get(lastseen+"/"+roomId)

    return  <div className='blockContainer'>
                <ChatMenu/>
                <ChatDisplay/>
                <ChatInput/>
            </div>
}