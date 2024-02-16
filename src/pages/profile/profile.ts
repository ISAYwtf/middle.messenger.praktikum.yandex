import { Block, omitProps, transformCase, validateEqualPassword } from '@utils';
import { default as template } from './profile.hbs?raw';
import { PASSWORD_FIELDS_CONFIG, PROFILE_FIELDS_CONFIG } from './fieldsConfig.ts';
import { ProfileModal, ProfileRow } from '@pages/profile/components';
import { ProfileEditMode, ProfileProps, ProfileRefs } from './types.ts';
import { Button } from '@components';
import { connect } from '@store';
import { ProfileRowProps } from '@pages/profile/components/profile-row/types.ts';
import { User } from '@store/types.ts';
import { authService, userService } from '@services';
import { UpdatingPasswordDTO, UpdatingProfileDTO } from '@api/user/types.ts';

function isField(element: ProfileRow | Button | ProfileModal): element is ProfileRow {
    return element instanceof ProfileRow;
}

export class Profile extends Block<ProfileProps, ProfileRefs> {
    constructor(props: ProfileProps) {
        super({
            ...props,
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
                    onClick: () => this.openLogoutModal(),
                },
            ],
            modalActions: [
                {
                    label: 'Выйти',
                    type: 'primary',
                },
            ],
            fields: PROFILE_FIELDS_CONFIG,
        });
    }

    get modal() {
        return this.refs.modal;
    }

    openLogoutModal() {
        this.modal.open({
            open: true,
            title: 'Вы действительно хотите выйти?',
            actions: [
                {
                    label: 'Выйти',
                    type: 'primary',
                    onClick: () => this.logout(),
                },
                {
                    label: 'Отмена',
                    onClick: () => this.modal.close(),
                },
            ]
        });
    }

    async logout() {
        await authService.logout();
        this.modal.close();
    }

    updateProfileFields() {
        if (this.editMode !== 'profile') {
            return;
        }

        const fields: ProfileRowProps[] = PROFILE_FIELDS_CONFIG.map((field) => {
            const transformedName = transformCase.camelCase(field.name) as keyof User;
            const value = String(this.props.user?.[transformedName] ?? '');

            return ({ ...field, value });
        });

        this.setProps({ fields });
    }

    private editMode: ProfileEditMode = ProfileEditMode.profile;

    private setEditMode(mode: ProfileEditMode) {
        this.editMode = mode;
    }

    private isCurrentField(name: string) {
        const profileFieldNames = PROFILE_FIELDS_CONFIG.map((config) => config.name);
        const passwordFieldNames = PASSWORD_FIELDS_CONFIG.map((config) => config.name);

        if (this.editMode === 'password') {
            return passwordFieldNames.includes(name);
        }

        return profileFieldNames.includes(name);
    }

    private get fieldElements() {
        // Получаем из refs только текущие поля ввода
        return Object.entries(this.refs)
            .reduce((acc, [key, element]) => {
                return isField(element) && this.isCurrentField(key)
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
        this.refs.saveAction.setProps({ disabled: this.error });
    }

    private async saveData() {
        if (this.error) {
            return;
        }
        const response = await this.postData();

        if (response === null) {
            return;
        }

        this.setEditMode(ProfileEditMode.profile);
        this.setProps({ editable: false });
    }

    private async postData() {
        if (this.editMode === 'profile') {
            const fields = this.fields as unknown as UpdatingProfileDTO;
            return await userService.updateProfile(fields);
        } else {
            const fields = omitProps(
                this.fields,
                ['repeatedPassword']
            ) as unknown as UpdatingPasswordDTO;
            return await userService.updatePassword(fields);
        }
    }

    private setEditableProfileData() {
        this.setEditMode(ProfileEditMode.profile);
        this.setProps({
            editable: true,
            fields: PROFILE_FIELDS_CONFIG,
        });
        this.applyErrorToSubmitButton();
    }

    protected getField(name: string) {
        return this.fields[name] ?? '';
    }

    private setEditablePasswordData() {
        this.setEditMode(ProfileEditMode.password);
        const resolvedFieldsConfig: ProfileRowProps[] = PASSWORD_FIELDS_CONFIG.map((fieldConfig) => {
            if (fieldConfig.name === 'repeatedPassword') {
                return {
                    ...fieldConfig,
                    validate: (value) => validateEqualPassword(value, this.getField('newPassword')),
                };
            }

            return fieldConfig;
        });
        this.setProps({
            editable: true,
            fields: resolvedFieldsConfig,
        });
        this.applyErrorToSubmitButton();
    }

    protected render(): string {
        this.updateProfileFields();

        return template;
    }
}

export const ProfileConnected = connect(['user'])(Profile);
