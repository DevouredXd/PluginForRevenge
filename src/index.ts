import { findByProps } from "@vendetta/metro";
import { after } from "@vendetta/patcher";

const unpatches = [];

export default {
  onLoad: () => {
    const ChatInput = findByProps("ChatInput");

    if (!ChatInput) return;

    unpatches.push(
      after("default", ChatInput, (_, res) => {
        if (!res?.props) return res;

        // Hide the send button
        res.props.showSendButton = false;

        // Override onSubmitEditing to send message
        const originalOnSubmitEditing = res.props.onSubmitEditing;
        res.props.onSubmitEditing = (e) => {
          const text = res.props.textValue?.trim();
          if (text?.length > 0) {
            res.props.onSend?.(); // Trigger the send
          } else {
            originalOnSubmitEditing?.(e); // fallback if needed
          }
        };

        return res;
      })
    );
  },

  onUnload: () => {
    unpatches.forEach((unpatch) => unpatch());
  },

  settings: null,
};
