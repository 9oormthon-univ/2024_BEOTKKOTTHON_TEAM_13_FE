import React from "react";

import SuccessModal from "./sub-components/SuccessModal/SuccessModal";
import AbortModal from "./sub-components/AbortModal/AbortModal";

import { usePageValue } from "../../contexts/PageContext";

function Modals() {
    const { isSuccessModalOpened, isAbortModalOpened } = usePageValue();

    return (
        <div>
            {isSuccessModalOpened && <SuccessModal />}
            {isAbortModalOpened && <AbortModal />}
        </div>
    );
}

export default Modals;
