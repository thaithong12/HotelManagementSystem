import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 800,
      marginLeft: 320 ,
    },

    media: {
      height: 550,
    },

    paper: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
          margin: theme.spacing(1),
          width: theme.spacing(80),
          height: theme.spacing(100),
        },
      },

      
  }));

  export const SlideStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 800,
      flexGrow: 1,
    },
    img: {
      height: 600,
      display: 'block',
      maxWidth: 800,
      overflow: 'hidden',
      width: '100%',
    },
  }));
  