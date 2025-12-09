import { Box, Button, Divider, Icon, Paper, Skeleton, Typography, useMediaQuery, useTheme } from '@mui/material';

interface DetailToolProps {
 textButtonNew?: string;
 showButtonNew?: boolean;
 showButtonSave?: boolean;
 showButtonSaveAndBack?: boolean;
 showButtonDelete?: boolean;
 showButtonBack?: boolean;   

 showButtonNewLoading?: boolean;
 showButtonSaveLoading?: boolean;
 showButtonSaveAndBackLoading?: boolean;
 showButtonDeleteLoading?: boolean;
 showButtonBackLoading?: boolean;

 onClickButtonNew?: () => void;
 onClickButtonSave?: () => void;
 onClickButtonSaveAndBack?: () => void;
 onClickButtonDelete?: () => void;
 onClickButtonBack?: () => void;
}

export const DetailTool = ({
  textButtonNew = 'Novo',
  showButtonNew = true,
  showButtonSave = true,
  showButtonDelete = true,
  showButtonBack = true,
  showButtonSaveAndBack = false,

  showButtonNewLoading = false,
  showButtonSaveLoading = false,
  showButtonSaveAndBackLoading = false,
  showButtonDeleteLoading = false,
  showButtonBackLoading = false,

  onClickButtonNew,
  onClickButtonSave,
  onClickButtonSaveAndBack,
  onClickButtonDelete,
  onClickButtonBack,
}: DetailToolProps) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  
  return (
    <Box height={theme.spacing(5)} marginX={1} padding={1} gap={1} paddingX={1} display="flex" alignItems="center" component={Paper}>
      {showButtonSave && !showButtonSaveLoading && 
        <Button variant="contained" color="primary" disableElevation onClick={onClickButtonSave} startIcon={<Icon>save</Icon>}>
          <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
            Salvar
          </Typography>
        </Button>
      }

      {showButtonSaveLoading && <Skeleton width={110} height={60} />}

      {!smDown && !mdDown && showButtonSaveAndBack && !showButtonSaveAndBackLoading && 
        <Button variant="outlined" color="primary" disableElevation onClick={onClickButtonSaveAndBack} startIcon={<Icon>save</Icon>}>
          <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
            Salvar e voltar
          </Typography>
        </Button>
      }

      {showButtonSaveAndBackLoading && !smDown && !mdDown && <Skeleton width={180} height={60} />}

      {showButtonDelete && !showButtonDeleteLoading && 
        <Button variant="outlined" color="primary" disableElevation onClick={onClickButtonDelete} startIcon={<Icon>delete</Icon>}>
          <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
            Apagar
          </Typography>
        </Button>
      }

      {showButtonDeleteLoading && <Skeleton width={110} height={60} />}

      {!smDown && showButtonNew && !showButtonNewLoading && 
        <Button variant="outlined" color="primary" disableElevation onClick={onClickButtonNew} startIcon={<Icon> add</Icon>}>
          <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
            {textButtonNew}
          </Typography>
        </Button>
      }

      {showButtonNewLoading && !smDown && <Skeleton width={110} height={60} />}

      {showButtonBack && (showButtonNew || showButtonSave || showButtonSaveAndBack || showButtonDelete) &&
       <Divider variant="middle" orientation="vertical" />
      }

      {showButtonBack && !showButtonBackLoading && 
        <Button variant="outlined" color="primary" disableElevation onClick={onClickButtonBack} startIcon={<Icon>arrow_back</Icon>}>
          <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
            Voltar
          </Typography>
        </Button>
      }

      {showButtonBackLoading && <Skeleton width={110} height={60} />}
    </Box>
  );
};
