import React from "react";

import SaveHeader from "./sub-components/SaveHeader/SaveHeader";
import EditProfileImage from "./sub-components/EditProfileImage/EditProfileImage";
import EditProfileInfo from "./sub-components/EditProfileInfo/EditProfileInfo";

import { EditProfileProvider } from "./contexts/EditProfileContext";

import styles from "./EditPage.module.scss";

function EditPage() {
    return (
        <div className={styles.EditPage}>
            <SaveHeader onSaveClicked={() => {}} />
            <EditProfileImage />
            <EditProfileInfo />
        </div>
    );
}

const withEditProfileProvider = (WrappedComponent) => (props) => {
    return (
        <EditProfileProvider>
            <WrappedComponent {...props} />
        </EditProfileProvider>
    );
};

export default withEditProfileProvider(EditPage);
