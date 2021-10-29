import React from "react";
import {Box, Button, RefreshSvgIcon, Tooltip} from "@nlmk/ds/dist/components";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    root: {
        maxWidth: '40px',
        minWidth: '40px',
        padding: '9px',
        maxHeight: '40px',
        minHeight: '40px',
        alignSelf: 'end'
    },
}))

interface ReloadButtonProps {
    reload: () => any,
}

export const ReloadButton: React.FC<ReloadButtonProps> = ({reload}) => {
    const classes = useStyles()
    return (
        <Button
            onClick={reload}
            variant="contained"
            color="secondary"
            className={classes.root}
        >
            <Tooltip title='{hintTitle}' placement="top">
                <Box height={24} width={24}>
                    <RefreshSvgIcon style={{color: '#167FFB'}}/>
                </Box>
            </Tooltip>
        </Button>
    )
}
