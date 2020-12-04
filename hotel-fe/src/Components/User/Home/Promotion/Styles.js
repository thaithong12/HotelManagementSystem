import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 600,
    },

    media: {
      height: 350,
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
      maxWidth: 600,
      flexGrow: 1,
    },
    img: {
      height: 400,
      display: 'block',
      maxWidth: 600,
      overflow: 'hidden',
      width: '100%',
    },
  }));
  