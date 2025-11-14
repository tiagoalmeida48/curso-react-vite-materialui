import { ListingTool } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts';

export const Dashboard = () => {
  return (
    <LayoutBasePage title="Página Inicial" listingTool={<ListingTool showSearch />}>
      Teste
    </LayoutBasePage>
  );
};
