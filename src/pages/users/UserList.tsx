import { useSearchParams } from 'react-router';
import { ListingTool } from '@/shared/components';
import { LayoutBasePage } from '@/shared/layouts';
import { useEffect, useMemo } from 'react';
import { UsersService } from '@/shared/services/api/users/UsersService';
import { useDebounce } from '@/shared/hooks';

export const UserList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { debounce } = useDebounce(1000);

  const search = useMemo(() => {
    return searchParams.get('search') || '';
  }, [searchParams]);

  useEffect(() => {
    debounce(() => {
      UsersService.getAll(1, search)
      .then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          console.log(result);
        }
      })
    });
  }, [search]);

  return (
    <LayoutBasePage
      title="Listagem de Usuários"
      listingTool={
        <ListingTool
          showSearch
          buttonNewLabel="Novo"
          search={search}
          changeSearch={(value) => setSearchParams({ search: value }, { replace: true })}
        />
      }>
      Teste
    </LayoutBasePage>
  );
};
