import { ChatInput, SubmitButton } from '@pages/chats/components';

export type ChatInputLineRefs = {
    input: ChatInput,
    submitButton: SubmitButton,
}

export interface ChatInputLineProps {
    onSubmit: () => void,
}
