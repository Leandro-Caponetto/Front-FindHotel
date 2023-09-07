import React, { useState } from 'react';
import 'react-chatbot-kit/build/main.css';
import Chatbot from "react-chatbot-kit";
import messageParser from './MessageParser';
import ActionProvider from './ActionsProvider';
import config from "./ChatBotConfig";
import imgs from "../../assets/image/bot.png"

function Chat() {
    const [showBot, toggleBot] = useState(false);
    const validateInput = ()=>{
       return true
    }
    return (
        <div style={{ position: 'fixed', right: '20px', bottom: '20px', zIndex: 1000 }}>
            {showBot && (
                <Chatbot
                    config={config}
                    actionProvider={ActionProvider}
                    messageParser={messageParser}
                    headerText='Chat with FindHotelBot'
                    placeholderText='Write here...'
                    validator={validateInput}
                    disableScrollToBottom
                />
            )}
            <button onClick={() => toggleBot((prev) => !prev)} className="items-center justify-center py-1 mt-2 font-medium no-underline duration-500 rounded-full w-14 h-14 bg-slate-400 hover:text-white hover:border-solid hover:border-slate-50 hover:bg-cream-200 ">
                <img src={imgs} className='h-10' alt='Not found' />
            </button>
        </div>
    );
}
export default Chat;