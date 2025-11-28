import { DetailTool } from '@/shared/components';
import { useVForm, VForm, VTextField, type IVFormErrors } from '@/shared/forms';
import { LayoutBasePage } from '@/shared/layouts';
import { UsersService } from '@/shared/services/api/users/UsersService';
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import * as yup from 'yup';
import { AutoCompleteCity } from './components/AutoCompleteCity';

interface IFormData {
  name: string;
  email: string;
  cityId: number;
}

const formValidationSchema: yup.ObjectSchema<IFormData> = yup.object().shape({
  name: yup.string().required().min(3),
  email: yup.string().email().required(),
  cityId: yup.number().required(),
});

export const UserDetail: React.FC = () => {
  const { id = 'novo' } = useParams<'id'>();
  const navegate = useNavigate();

  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('');

  useEffect(() => {
    if (id !== 'novo') {
      setIsLoading(true);
      UsersService.getById(Number(id)).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          navegate('/usuarios');
        } else {
          setNome(result.name);
          formRef.current?.setData(result);
        }
      });
    } else {
      formRef.current?.setData({
        name: '',
        email: '',
        cityId: undefined
      });
    }
  }, [id]);

  const handleSave = (data: IFormData) => {
    formValidationSchema.validate(data, { abortEarly: false })
      .then(() => {
        setIsLoading(true);
        if (id === 'novo') {
          UsersService.create(data).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              alert(result.message);
            } else {
              if (isSaveAndClose()) {
                navegate('/usuarios');
              } else {
                navegate(`/usuarios/detalhe/${result}`);
              }
            }
          });
        } else {
          UsersService.updateById(Number(id), { id: Number(id), ...data }).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              alert(result.message);
            } else {
              if (isSaveAndClose()) {
                navegate('/usuarios');
              }
            }
          });
        }
      }).catch((errors: yup.ValidationError) => {
        const errorMessages: IVFormErrors = {};
        errors.inner.forEach((error) => {
          if (!error.path) return;

          errorMessages[error.path] = error.message;
        });

        formRef.current?.setErrors(errorMessages);
      });
  };

  const handleDelete = (id: number) => {
    if (confirm('Deseja realmente excluir este registro?')) {
      UsersService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert('Registro excluído com sucesso!');
          navegate('/usuarios');
        }
      });
    }
  };

  return (
    <LayoutBasePage
      title={id !== 'novo' ? `Detalhes de usuário: ${nome}` : 'Novo usuário'}
      listingTool={
        <DetailTool
          textButtonNew="Novo"
          showButtonSaveAndBack
          showButtonNew={id !== 'novo'}
          showButtonDelete={id !== 'novo'}
          onClickButtonSave={save}
          onClickButtonSaveAndBack={saveAndClose}
          onClickButtonDelete={() => handleDelete(Number(id))}
          onClickButtonNew={() => navegate('/usuarios/detalhe/novo')}
          onClickButtonBack={() => navegate('/usuarios')}
        />
      }>

      <VForm ref={formRef} onSubmit={handleSave}>
        <Box margin={1} display='flex' flexDirection='column' component={Paper} variant='outlined'>
          <Grid container direction='column' padding={2} spacing={2}>
            {isLoading && <Grid>
              <LinearProgress variant='indeterminate' />
            </Grid>}

            <Grid>
              <Typography variant='h6'>Geral</Typography>
            </Grid>

            <Grid container direction='row' spacing={2}>
              <Grid size={{ xs: 12, md: 6, lg: 4, xl: 2 }}>
                <VTextField
                  fullWidth
                  label='Nome'
                  name='name'
                  disabled={isLoading}
                  onChange={(e) => setNome(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container direction='row' spacing={2}>
              <Grid size={{ xs: 12, md: 6, lg: 4, xl: 2 }}>
                <VTextField fullWidth label='Email' name='email' disabled={isLoading} />
              </Grid>
            </Grid>
            <Grid container direction='row' spacing={2}>
              <Grid size={{ xs: 12, md: 6, lg: 4, xl: 2 }}>
                <AutoCompleteCity isExternalLoading={isLoading} />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>
    </LayoutBasePage>
  );
};
