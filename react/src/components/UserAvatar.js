import {
  Avatar
} from '@mui/material';
import useMounted from 'hooks/useMounted';
import { useEffect, useState } from 'react';
import { usersApi } from '__api__';

const UserAvatar = ({ id = null, user = null, sx = {} }) => {
  const mounted = useMounted();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (id && !user) {
      usersApi.get(id).then((res) => {
        if (mounted.current) {
          setData(res);
        }
      });
    }
    if (user) {
      setData(user);
    }
  }, [id, user]);

  return (
    <Avatar
      title={data ? data.full_name : '...'}
      src={data ? data.picture : ''}
      sx={sx}
    />
  );
};
export default UserAvatar;
