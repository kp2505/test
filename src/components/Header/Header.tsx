import './Header.css'
import LogoSvgIcon from "@nlmk/ds/dist/components/Icon/LogoSvgIcon";
import React from "react";
import {useKeyCloakUserName} from "@nlmk/ds/dist/components";


export const Header: React.FC = () => {
    const userName = useKeyCloakUserName();
    return (
        <div className="menu">
            <LogoSvgIcon />
            <div className="menu-name">
                КПЭ ТОиР. Просмотр и изменение объектов
            </div>
            <div className="menu-info">{userName}</div>
        </div>
    )
}
