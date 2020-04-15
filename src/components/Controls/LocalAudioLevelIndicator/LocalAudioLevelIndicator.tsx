import React from 'react';
import { LocalAudioTrack } from 'twilio-video';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
import AudioLevelIndicator from '../../AudioLevelIndicator/AudioLevelIndicator';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import useLocalAudioToggle from '../../../hooks/useLocalAudioToggle/useLocalAudioToggle';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(1),
    },
  })
);

export default function LocalAudioLevelIndicator(props: { disabled?: boolean }) {
  const { localTracks } = useVideoContext();
  const audioTrack = localTracks.find(track => track.kind === 'audio') as LocalAudioTrack;
  const classes = useStyles();

  return (
    <Tooltip
      title={'Audio level indicator'}
      placement="top"
      PopperProps={{ disablePortal: true }}
    >
      <Fab className={classes.fab} disabled={props.disabled} data-cy-audio-toggle>
        <AudioLevelIndicator size={30} audioTrack={audioTrack} />
      </Fab>
    </Tooltip>
  );

}

