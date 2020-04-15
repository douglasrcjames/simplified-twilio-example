import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';

import useFullScreenToggle from '../../../hooks/useFullScreenToggle/useFullScreenToggle';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(1),
    },
  })
);

export default function ToggleFullscreenButton(props: { disabled?: boolean }) {
  const classes = useStyles();
  const [isFullScreen, toggleFullScreen] = useFullScreenToggle();

  return (
    <Tooltip
      title={isFullScreen ? 'Fullscreen' : 'Exit Fullscreen'}
      placement="top"
      PopperProps={{ disablePortal: true }}
    >
      <Fab className={classes.fab} onClick={toggleFullScreen} disabled={props.disabled} data-cy-audio-toggle>
        {isFullScreen ? <FullscreenIcon /> : <FullscreenExitIcon />}
      </Fab>
    </Tooltip>
  );
}
