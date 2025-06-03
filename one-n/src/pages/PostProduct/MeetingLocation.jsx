import React from "react";

import DetailHeader from "../../components/DetailHeader/DetailHeader";
import Map from "./sub-components/Map/Map";
import AddressInfo from "./sub-components/AddressInfo/AddressInfo";

import { MapsProvider } from "./contexts/MapsContext";

function MeetingLocation() {
    return (
        <div>
            <DetailHeader label="주소 검색" enableOption={false} />
            <Map />
            <AddressInfo />
        </div>
    );
}

const withMapsContext = (WrappedComponent) => (props) => {
    return (
        <MapsProvider>
            <WrappedComponent {...props} />
        </MapsProvider>
    );
};

export default withMapsContext(MeetingLocation);
