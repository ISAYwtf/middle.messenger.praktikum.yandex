import { Block } from '@utils';
import { default as template } from './search-input.hbs?raw';
import { SearchInputProps } from './types.ts';
import { chatsService } from '@services';

export class SearchInput extends Block<SearchInputProps> {
    constructor() {
        super({
            onChange: (event) => this.onChange(event),
        });
    }

    private inputTimeoutId: NodeJS.Timeout | null = null;
    private readonly inputTimeout = 1000;

    private async onChange(event: Event) {
        const target = event.currentTarget as HTMLInputElement;
        const value = target.value;

        await this.debounce(value);
    }

    private async debounce(value: string) {
        if (this.inputTimeoutId) {
            clearTimeout(this.inputTimeoutId);
            this.inputTimeoutId = null;
        }

        if (value === '') {
            await this.action(value);
            return;
        }

        this.inputTimeoutId = setTimeout(() => {
            this.action(value);
        }, this.inputTimeout);
    }

    private async action(value: string) {
        await chatsService.getChats({ title: value });
    }

    protected render(): string {
        return template;
    }
}
