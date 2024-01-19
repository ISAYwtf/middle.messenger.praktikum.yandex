import { Block } from '@utils';
import { default as template } from './profile.hbs?raw';
import ProfileExampleImg from '@assets/img/profileExample.jpg';
import { passwordFields, profileFields } from './stub.ts';
import { ProfileRow } from '@pages/profile/components';
import { ProfileEditMode, ProfileProps, ProfileRefs } from './types.ts';
import { Button } from '@components';

function isField(element: ProfileRow | Button): element is ProfileRow {
    return element instanceof ProfileRow;
}

export class Profile extends Block<ProfileProps, ProfileRefs> {
    constructor() {
        super({
            firstName: 'Искандер',
            image: {
                path: ProfileExampleImg,
                name: 'profile'
            },
            editable: false,
            onSave: () => this.saveData(),
            actions: [
                {
                    label: 'Изменить данные',
                    onClick: () => this.setEditableProfileData(),
                },
                {
                    label: 'Изменить пароль',
                    onClick: () => this.setEditablePasswordData(),
                },
                {
                    label: 'Выйти',
                    critical: true,
                },
            ],
            fields: profileFields,
        });
    }

    // todo Можно изменить место хранения после реализации state-management
    private editMode: ProfileEditMode = ProfileEditMode.profile;

    private setEditMode(mode: ProfileEditMode) {
        this.editMode = mode;
    }

    private get fieldElements() {
        // Получаем из refs только поля ввода
        return Object.entries(this.refs)
            .reduce((acc, [key, element]) => {
                return isField(element)
                    ? ({ ...acc, [key]: element })
                    : acc;
            }, {} as Record<string, ProfileRow>);
    }

    private get fields() {
        return Object.entries(this.fieldElements)
            .reduce((acc, [fieldKey, field]) => ({
                ...acc,
                [fieldKey]: field.value
            }), {} as Record<string, string | null>);
    }

    private get error() {
        return Object.values(this.fieldElements)
            .some((element) => element.error);
    }

    private applyErrorToSubmitButton() {
        Object.values(this.fieldElements)
            .forEach((fieldElement) => fieldElement
                .setProps({
                    onValidate: () => {
                        this.refs.saveAction.setProps({ disabled: this.error });
                    }
                }));
    }

    private saveData() {
        if (this.error) {
            return;
        }
        this.setEditMode(ProfileEditMode.profile);
        this.postData();
    }

    private postData() {
        // todo Отправка данных на сервер
        console.log(this.fields);
        this.setProps({
            editable: false,
            fields: this.editMode === ProfileEditMode.profile
                ? this.props.fields.map((field) => ({
                    ...field,
                    value: this.fields[field.name] ?? field.value,
                    editable: false,
                })) : profileFields,
        });
    }

    private setEditableProfileData() {
        this.setEditMode(ProfileEditMode.profile);
        this.setProps({
            editable: true,
            fields: this.props.fields?.map((field) => ({
                ...field,
                editable: true,
            })),
        });
        this.applyErrorToSubmitButton();
    }

    private setEditablePasswordData() {
        this.setEditMode(ProfileEditMode.password);
        this.setProps({
            editable: true,
            fields: passwordFields.map((field) => ({
                ...field,
                editable: true,
            }))
        });
        this.applyErrorToSubmitButton();
    }

    protected render(): string {
        return template;
    }
}
