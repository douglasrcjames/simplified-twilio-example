import React, { useState, useRef, useCallback } from 'react';
import AboutDialog from '../AboutDialog/AboutDialog';
import IconButton from '@material-ui/core/IconButton';
import MenuContainer from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreIcon from '@material-ui/icons/MoreVert';

import { useAppState } from '../../../state';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';

export default function Menu() {
  const { signOut } = useAppState();
  const { room, localTracks } = useVideoContext();

  const [aboutOpen, setAboutOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const anchorRef = useRef<HTMLDivElement>(null);

  const handleSignOut = useCallback(() => {
    room.disconnect?.();
    localTracks.forEach(track => track.stop());
    signOut?.();
  }, [room.disconnect, localTracks, signOut]);

  return (
    <div ref={anchorRef}>
      <IconButton color="inherit" onClick={() => setMenuOpen(state => !state)}>
        <MoreIcon />
      </IconButton>
      <MenuContainer open={menuOpen} onClose={() => setMenuOpen(state => !state)} anchorEl={anchorRef.current}>
        <MenuItem onClick={() => setAboutOpen(true)}>About</MenuItem>
      </MenuContainer>
      <AboutDialog
        open={aboutOpen}
        onClose={() => {
          setAboutOpen(false);
          setMenuOpen(false);
        }}
      />
    </div>
  );
}
