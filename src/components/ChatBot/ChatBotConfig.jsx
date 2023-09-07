import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import imgs from "../../assets/image/bot.png"
import Overview from "./OverView";
import MessageParser from "./MessageParser";
import ActionProviderDocs from "./ActionsProvider";

const botName = "FindHotelBot";
const headerStyle = {
    fontFamily: "Cocogoose", // Establece la fuente Cocogoose
  };
const config = {
    botName: botName,
    lang: "no",
    customStyles: {
        botMessageBox: {
            backgroundColor: "#c9af7f",
        },
        chatButton: {
            backgroundColor: "#c9af7f",
        },
    },
    initialMessages: [
        createChatBotMessage(
            `Hi, I'm ${botName}.
            I am here to guide you in whatever you need.
            Please tell me your name to start`
        ),
    ],
    state: {
        gist: "",
    },
    customComponents: {
        header: () => <div className="py-3 font-medium text-center rounded-t-md bg-cream-300 " style={headerStyle}>Chat with {botName}</div>,
        botAvatar: () => <div className = " items-center justify-center font-medium rounded-full w-11 h-11 bg-slate-400">
        <img src={imgs} className='h-8' alt='Not found'/>
        </div>,
    },
    widgets: [
        {
            widgetName: "overview",
            widgetFunc: (props) => <Overview {...props} />,
            mapStateToProps: ["gist"],
        },
        {
            widgetName: "messageParser",
            widgetFunc: (props) => <MessageParser {...props} />,
            mapStateToProps: ["gist"],
        },
        {
            widgetName: "actionProviderDocs",
            widgetFunc: (props) => <ActionProviderDocs {...props} />,
            mapStateToProps: ["gist"],
        },
    ],
};

export default config;