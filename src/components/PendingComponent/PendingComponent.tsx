import './PendingComponent.css'
import {Loader} from "@nlmk/ds/dist/components";
import React from "react";

export const PendingComponent: React.FC = () => {
    return (
        <div className='PendingComponent'>
            <Loader />
        </div>
    )
}
