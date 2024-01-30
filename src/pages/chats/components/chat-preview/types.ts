import { Image } from '@types';

export interface ChatPreviewProps {
    id: string,
    image?: Image,
    name: string,
    time: string,
    message: string,
    opposite?: boolean,
    count?: number,
}
