import React, { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Avatar, IconButton } from '@mui/material';
import AuthModal from '../../pages/User/AuthModal';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { getAuth, signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { authActions } from '../../redux/authSlice';
import { roleDataActions } from '../../redux/roleSlice';
import { tokenActions } from '../../redux/tokenSlice';
import { userDataActions } from '../../redux/userSlice';

const Account = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [opens, setOpens] = React.useState(false);
  const anchorRef = React.useRef(null);

  const navigate = useNavigate();

  const currentUser = useSelector((state) => state?.user?.data);
  const isAuth = useSelector((state) => state?.auth?.isAuth);



  const handleToggle = () => {
    if (isAuth) setOpens((prevOpen) => !prevOpen);
    else setOpen(true);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpens(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpens(false);
    } else if (event.key === 'Escape') {
      setOpens(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(opens);
  React.useEffect(() => {
    if (prevOpen.current === true && opens === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = opens;
  }, [opens]);

  const logOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch(authActions.logout());
        dispatch(roleDataActions.removeRole(null));
        dispatch(tokenActions.removeToken(null));
        dispatch(userDataActions.removeUser(null));
        setOpens(false);
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Stack direction="row" spacing={2}>

        <div className="h-full">

          <IconButton
            ref={anchorRef}
            id="composition-button"
            aria-controls={opens ? 'composition-menu' : undefined}
            aria-expanded={opens ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <div className="flex h-full items-center ">
              <Avatar size="small" sx={{ width: 22, height: 22 }} src={currentUser?.image || currentUser?.name} />
            </div>
          </IconButton>
          <Popper open={opens} anchorEl={anchorRef.current} role={undefined} placement="bottom-start" transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
                  // position: 'absolute',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList autoFocusItem={opens} id="composition-menu" aria-labelledby="composition-button" onKeyDown={handleListKeyDown}>
                      <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
                      <MenuItem onClick={logOut}>Logout</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </Stack>

      <AuthModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Account;


