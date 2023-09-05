import React, { useState } from 'react';
import { createClientMessage} from "react-chatbot-kit";

// eslint-disable-next-line react/prop-types
const ActionProvider = ({ createChatBotMessage, setState, children }) => {
   const [showBot, toggleBot] = useState(true);
   const handleHello = async (m) => {
      const botMessage = await createChatBotMessage(`Hello ${m}. It's a pleasure to serve you.`);

      await setState((prev) => ({
         ...prev,
         messages: [...prev.messages, botMessage],
      }));
      const questionMessage = await createChatBotMessage(`I leave you these options that may be of interest to you`,
         {
            withAvatar: false,
            delay: 500,
            widget: "overview",
         }
      );

      await setState((prev) => ({
         ...prev,
         messages: [...prev.messages, questionMessage],
      }));
   };

   const handleQuestionFalse = async () => {
      const botMessage = await createChatBotMessage('You have not selected any valid option');
         
         await setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
         }));

         const questionMessage = await createChatBotMessage(`I leave you these options that may be of interest to you`,
            {
               withAvatar: false,
               delay: 500,
               widget: "overview",
            }
         )

         await setState((prev) => ({
            ...prev,
            messages: [...prev.messages, questionMessage],
         }));
   }

   const handleQuestion = async (m) => {
      const botquestion = await createClientMessage(m);

      await setState((prev) => ({
         ...prev,
         messages: [...prev.messages, botquestion],
      }));

      let answerMessage = '';
      switch (m) {
         case '¿How do I look for a hotel??': 
            answerMessage = 'You selected "How do I search for a Hotel?". For this, you can use our menu, where you must first select the city or name of the hotel in which you will stay, then select the dates of arrival and departure from the hotel, how many people will stay and then select search';
            break;
         case '¿How can I reserve a room?': 
            answerMessage = 'You selected "How can I book a room?". To reserve a room you must log in, once you have selected the hotel you want to go to, enter its details, click "reserve", fill in your personal information, make the payment and enjoy your stay';
            break;
         case '¿How can I offer my hotel on the page?': 
            answerMessage = 'You selected "How can I offer my hotel on the page?". To put your hotel in the findHotel you must log in and then register your property, enter the "Register hotel" section, filling in the requested information and publish your hotel';
            break;
         case '¿What can I do in my dashboard?': 
            answerMessage = 'Syou chose "Admin Panel". You can access the information of your reservations / your favorite hotels / in your user panel';
            break;
         case 'I need other information': 
            answerMessage = 'You selected "Other information". For more specific and detailed information you can contact an administrator in the "Contact" section located at the bottom of the page';
            break;
         default:
            answerMessage = 'You have not selected any valid option';
         } 
         const botMessage = await createChatBotMessage(answerMessage);
         
         await setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
         }));

         const questionMessage = await createChatBotMessage(`I leave you these options that may be of interest to you`,
            {
               withAvatar: false,
               delay: 1000,
               widget: "overview",
            }
         )

         await setState((prev) => ({
            ...prev,
            messages: [...prev.messages, questionMessage],
         }));
   };


   const handleGoodBye = async () => {
      const botMessage = await createChatBotMessage(`Thank you for using our app. Remember that it is always a pleasure to serve you`);

      await setState((prev) => ({
         ...prev,
         messages: [...prev.messages, botMessage],
      }));
      setTimeout((() => toggleBot(false)), 5000); 
   };

  // Put the handleHello function in the actions object to pass to the MessageParser
   return (
      <div>
         {showBot && React.Children.map(children, (child) => {
            return React.cloneElement(child, {
               actions: {
                  handleHello,
                  handleQuestion,
                  handleGoodBye,
                  handleQuestionFalse
               },
            });
         })}
      </div>
   );
};

export default ActionProvider;