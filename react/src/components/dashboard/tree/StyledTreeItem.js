import {
  alpha, Typography
} from '@mui/material';
import {
  TreeItem, treeItemClasses, useTreeItem
} from '@mui/lab';
import { styled } from '@mui/styles';
import clsx from 'clsx';
import { forwardRef } from 'react';
import { ArrowRight } from '@mui/icons-material';
import { useLocation } from 'react-router';

const CustomContent = forwardRef((props, ref) => {
  const location=useLocation();
  const isLocationCatalogue=location.pathname.startsWith('/stories/');
  const {
    classes,
    className,
    label,
    nodeId,
    icon: iconProp,
    expansionIcon,
    displayIcon,
  } = props;

  const {
    disabled,
    expanded,
    selected,
    focused,
    handleExpansion,
    handleSelection,
    preventSelection,
  } = useTreeItem(nodeId);

  const icon = expansionIcon || displayIcon;

  const handleMouseDown = (event) => {
    preventSelection(event);
  };

  const handleExpansionClick = (event) => {
    handleExpansion(event);
  };

  const handleSelectionClick = (event) => {
    handleSelection(event);
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={clsx(className, classes.root, {
        [classes.expanded]: expanded,
        [classes.selected]: selected,
        [classes.focused]: focused,
        [classes.disabled]: disabled,
      })}
      onMouseDown={handleMouseDown}
      ref={ref}
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div
        onClick={handleExpansionClick}
        className={classes.iconContainer}
      >
        {icon}
      </div>
      {iconProp}
      <Typography
        onClick={handleSelectionClick}
        component='div'
        className={classes.label}
      >
        {label}
      </Typography>
    </div>
  );
});

const StyledTreeItem = styled((props) => (
  <TreeItem
    ContentComponent={CustomContent}
    {...props}
  />
))(({ theme }) => ({
  [`& .${treeItemClasses.iconContainer}`]: {
    '& .close': {
      opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}));

export default StyledTreeItem;
