import React from "react";

import { ReactComponent as CheckboxDefaultIcon } from "../../../../assets/icons/checkbox-default.svg";
import { ReactComponent as CheckboxCheckedIcon } from "../../../../assets/icons/checkbox-checked.svg";

function Checkbox({ id, checked, onChange }) {
    return (
        <>
            <input
                type="checkbox"
                id={id}
                checked={checked}
                onChange={onChange}
                style={{ display: "none" }}
            />
            {checked && (
                <CheckboxCheckedIcon
                    width="16"
                    height="16"
                    onClick={onChange}
                />
            )}
            {!checked && (
                <CheckboxDefaultIcon
                    width="16"
                    height="16"
                    onClick={onChange}
                />
            )}
        </>
    );
}

export default Checkbox;
