import React from "react";

import SearchBar from "./sub-components/SearchBar/SearchBar";
import BottomMenu from "./sub-components/BottomMenu/BottomMenu";
import PositionResetButton from "./sub-components/PositionResetButton/PositionResetButton";
import Map from "./sub-components/Map/Map";

import { MapsProvider } from "./contexts/MapsContext";
import { ProductProvider } from "./contexts/ProductContext";

function MapsPage() {
    return (
        <div>
            <SearchBar />
            <BottomMenu />
            <Map />
            <PositionResetButton />
        </div>
    );
}

const withProviders = (WrappedComponent) => (props) => {
    return (
        <MapsProvider>
            <ProductProvider>
                <WrappedComponent {...props} />
            </ProductProvider>
        </MapsProvider>
    );
};

export default withProviders(MapsPage);
