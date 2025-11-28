import { DetailTool } from '@/shared/components';
import { useVForm, VForm, VTextField, type IVFormErrors } from '@/shared/forms';
import { LayoutBasePage } from '@/shared/layouts';
import { CitiesService } from '@/shared/services/api/cities/CitiesService';
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import * as yup from 'yup';

interface IFormData {
  name: string;
}

const formValidationSchema: yup.ObjectSchema<IFormData> = yup.object().shape({
  name: yup.string().required().min(3)
});

export const CityDetail: React.FC = () => {
  const { id = 'nova' } = useParams<'id'>();
  const navegate = useNavigate();

  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('');

  useEffect(() => {
    if (id !== 'nova') {
      setIsLoading(true);
      CitiesService.getById(Number(id)).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          navegate('/cidades');
        } else {
          setNome(result.name);
          formRef.current?.setData(result);
        }
      });
    } else {
      formRef.current?.setData({
        name: ''
      });
    }
  }, [id]);

  const handleSave = (data: IFormData) => {
    formValidationSchema.validate(data, { abortEarly: false })
      .then(() => {
        setIsLoading(true);
        if (id === 'nova') {
          CitiesService.create(data).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              alert(result.message);
            } else {
              if (isSaveAndClose()) {
                navegate('/cidades');
              } else {
                navegate(`/cidades/detalhe/${result}`);
              }
            }
          });
        } else {
          CitiesService.updateById(Number(id), { id: Number(id), ...data }).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              alert(result.message);
            } else {
              if (isSaveAndClose()) {
                navegate('/cidades');
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
      CitiesService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert('Registro excluído com sucesso!');
          navegate('/cidades');
        }
      });
    }
  };

  return (
    <LayoutBasePage
      title={id !== 'nova' ? `Detalhes da cidade: ${nome}` : 'Nova cidade'}
      listingTool={
        <DetailTool
          textButtonNew="Nova"
          showButtonSaveAndBack
          showButtonNew={id !== 'nova'}
          showButtonDelete={id !== 'nova'}
          onClickButtonSave={save}
          onClickButtonSaveAndBack={saveAndClose}
          onClickButtonDelete={() => handleDelete(Number(id))}
          onClickButtonNew={() => navegate('/cidades/detalhe/nova')}
          onClickButtonBack={() => navegate('/cidades')}
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
          </Grid>
        </Box>
      </VForm>
    </LayoutBasePage>
  );
};
