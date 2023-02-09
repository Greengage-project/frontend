import {
  Avatar, Box, Button, Collapse, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, IconButton, Input,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar, ListItemSecondaryAction, ListItemText, MenuItem, MobileStepper, Select, TextField, Typography, useTheme
} from '@mui/material';
import { Close, Delete, KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { TEAM_TYPES } from '../../../constants';
import useAuth from 'hooks/useAuth';
import { useCustomTranslation } from 'hooks/useDependantTranslation';
import { useEffect, useState } from 'react';
import { TransitionGroup } from 'react-transition-group';
import { getLanguage } from 'translations/i18n';
import { teamsApi } from '__api__';
import UserSearch from 'components/dashboard/coproductionprocesses/UserSearch';



const TeamCreate = ({ language = getLanguage(), loading, setLoading, open, setOpen, onCreate, organization }) => {
  const { user } = useAuth()
  const [_loading, _setLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([user]);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [logotype, setLogotype] = useState(null);

  const t = useCustomTranslation(language);
  const [activeStep, setActiveStep] = useState(0);

  const ORG_OPTIONS = TEAM_TYPES(t);

  const final_loading = loading || _loading;
  const final_set_loading = setLoading || _setLoading;

  useEffect(() => {
    setType(organization.default_team_type);
  }, [organization]);

  const clean = () => {
    setName('');
    setDescription('');
    setLogotype(null);
    setSelectedUsers([user]);
    setActiveStep(0);
  };
  const handleNext = async () => {
    const sendOnCreate = (data) => {
      if (onCreate) {
        onCreate(data);
      }
      handleClose();
    };

    if (activeStep < 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      final_set_loading(true);
      teamsApi.create({
        name,
        description,
        type,
        user_ids: selectedUsers.map((user) => user.id),
        organization_id: organization ? organization.id : null
      }).then((res) => {
        if (!logotype) {
          sendOnCreate(res.data);
          final_set_loading(false);
        } else {
          teamsApi.setFile(res.data.id, 'logotype', logotype).then((res2) => {
            sendOnCreate(res2.data);
          }).catch(() => {
            sendOnCreate(res.data);
          }).finally(() => {
            final_set_loading(false);
          });
        }
      }).catch((err) => {
        console.log(err);
        final_set_loading(false);
      });
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleFileSelected = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      const file = files[0];
      if (file) {
        file.path = URL.createObjectURL(file);
        setLogotype(file);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
    // avoid seeing how data is cleared
    setTimeout(() => {
      clean();
    }, 1000);
  };

  const deleteUserFromList = (sub) => {
    setSelectedUsers(selectedUsers.filter((user) => user.sub !== sub));
  };

  const isDisabled = () => {
    if (activeStep === 0 && (!name || !description || !type)) {
      return true;
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth='xs'
        fullWidth
      >
        <DialogTitle>{t('team-create-title')}</DialogTitle>
        <DialogContent>
          {activeStep === 0 && (
            <>
              <Box sx={{ textAlign: 'center' }}>
                <label htmlFor='contained-button-file'>
                  <Input
                    inputProps={{ accept: 'image/*' }}
                    id='contained-button-file'
                    type='file'
                    sx={{ display: 'none' }}
                    onChange={handleFileSelected}
                  />
                  <IconButton component='span'>
                    <Avatar
                      src={logotype && logotype.path}
                      style={{
                        margin: '10px',
                        width: '60px',
                        height: '60px',
                      }}
                    />
                    {!logotype && (
                      <Typography variant='body1'>
                        {t('Click here to add a logo')}
                      </Typography>
                    )}
                  </IconButton>
                </label>
                {logotype && (
                  <IconButton onClick={(event) => {
                    setLogotype(null);
                  }}
                  >
                    <Close />
                  </IconButton>
                )}
              </Box>
              <TextField
                autoFocus
                margin='dense'
                id='name'
                label={t('Name')}
                value={name}
                onChange={(e) => setName(e.target.value)}
                type='text'
                fullWidth
                variant='standard'
              />
              <TextField
                margin='dense'
                id='description'
                label={t('Description')}
                type='text'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                multiline
                rows={4}
                variant='standard'
              />
              <FormControl
                variant='standard'
                fullWidth
                sx={{ mt: 2 }}
              >
                <InputLabel id='select-type'>{t('Type')}</InputLabel>
                <Select
                  fullWidth
                  labelId='select-type-label'
                  id='select-type'
                  value={type}
                  onChange={(event) => {
                    setType(event.target.value);
                  }}
                  label={t('Organization type')}
                >
                  {ORG_OPTIONS.map((lan) => (
                    <MenuItem
                      key={lan.value}
                      value={lan.value}
                    >
                      {lan.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}

          {activeStep === 1 && (
            <>
              <List dense>
                <TransitionGroup>
                  {selectedUsers.map((se) => {
                    let name = se.full_name;
                    const you = se.id === user.id;
                    if (you) {
                      name += ` (${t('you')})`;
                    }
                    return (
                      <Collapse key={se.id}>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar src={se.picture} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={name}
                          />
                          <ListItemSecondaryAction>
                            <IconButton
                              edge='end'
                              aria-label='delete'
                              onClick={() => deleteUserFromList(se.sub)}
                            >
                              <Delete />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      </Collapse>
                    );
                  })}
                </TransitionGroup>

              </List>
              <Divider sx={{ my: 3 }} />
              <UserSearch
                exclude={selectedUsers.map(se => se.id)}
                organization_id={organization.id}
                onClick={us => setSelectedUsers([...selectedUsers, us])}
              />
            </>
          )}

        </DialogContent>
        <DialogActions>
          <MobileStepper
            variant='dots'
            steps={2}
            position='static'
            activeStep={activeStep}
            sx={{ flexGrow: 1 }}
            nextButton={(
              <LoadingButton
                size='small'
                onClick={handleNext}
                disabled={isDisabled()}
                loading={final_loading}
              >
                {activeStep === 1 ? t('Create') : t('Next')}
                <KeyboardArrowRight />
              </LoadingButton>
            )}
            backButton={(
              <Button
                size='small'
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                <KeyboardArrowLeft />
                {t('Back')}
              </Button>
            )}
          />

        </DialogActions>
      </Dialog>
    </>
  );
};

export default TeamCreate;
