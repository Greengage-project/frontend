import { AppBar, Box, Paper, Tab, Tabs, Typography } from '@mui/material';
import { AccountTree, OpenInNew } from '@mui/icons-material';
import { AssetsTable } from 'components/dashboard/assets';
import { useCustomTranslation } from 'hooks/useDependantTranslation';
import useMounted from 'hooks/useMounted';
import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { setSelectedTreeItemById } from 'slices/process';
import { coproductionProcessesApi } from '__api__';
import TimeLine from 'components/dashboard/coproductionprocesses/TimeLine';
import CoproNotifications from 'components/dashboard/coproductionprocesses/CoproNotifications';
import {  getAssetsList_byCopro, getCoproductionProcessNotifications } from 'slices/general';
import useAuth from 'hooks/useAuth';
import { cleanProcess } from 'slices/process';
import { defaultReduceAnimations } from '@mui/lab/CalendarPicker/CalendarPicker';

export default function Resources({ }) {
  const { process, isAdministrator, tree } = useSelector((state) => state.process);
  const t = useCustomTranslation(process.language);
  const [tab, setTab] = useState(isAdministrator & !process.is_part_of_publication ? 'progress' : 'assets');
  const [loading, setLoading] = React.useState(true);
  //const [assets, setAssets] = React.useState([]);
  const { assetsList } = useSelector((state) => state.general);
  const mounted = useMounted();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = React.useState('');


  const { user, isAuthenticated } = useAuth();

  React.useEffect(() => {
    setLoading(true);
    
    
    // coproductionProcessesApi.getAssets(process.id).then((res) => {
    //   if (mounted.current) {
    //     setAssets(res);
    //     setLoading(false);
    //   }
    // });
    dispatch(getAssetsList_byCopro(process.id));
    setLoading(false);

  }, [process]);

  React.useEffect(() => {
    if(tab === "notifications"){
      //Load notifications when the tab change to notifications:
      dispatch(getCoproductionProcessNotifications({'coproductionprocess_id':process.id,'asset_id':''}));

    }
  }, [tab]);

  const notificationsList = useSelector((state) => {
      return state.general.coproductionprocessnotifications;
  });

  const getAssetsActions = (asset) => {
    const actions = [];
    actions.push({
      id: `${asset.id}-open-action`,
      onClick: (closeMenuItem) => {
        window.open(`${asset.link}/view`, '_blank');
        closeMenuItem();
      },
      text: t('Open'),
      icon: <OpenInNew fontSize='small' />
    });
    actions.push({
      id: `${asset.id}-open-task-action`,
      onClick: (closeMenuItem) => {
        dispatch(setSelectedTreeItemById(asset.task_id, () => {
          navigate(`/dashboard/coproductionprocesses/${process.id}/guide`);
        }));
      },
      text: t('Go to the task'),
      icon: <AccountTree fontSize='small' />
    });
    return actions;
  };

  if (!process || !tree) {
    return;
  }


  return (
    <Box sx={{ pb: 3, justifyContent: "center" }}>
      <AppBar sx={{ position: "relative" }}>
        <Typography variant="h6" sx={{ p: 2 }}>
          {t("Resources")}
        </Typography>
      </AppBar>
            
      
        <Box sx={{ p: 3, justifyContent: "center" }}>
          <AssetsTable
            language={process.language}
            loading={loading}
            getActions={getAssetsActions}
          />
        </Box>
   
      
    </Box>
  );
}