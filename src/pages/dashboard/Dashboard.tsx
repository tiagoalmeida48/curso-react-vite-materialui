import { DetailTool } from '@/shared/components';
import { LayoutBasePage } from '@/shared/layouts';

export const Dashboard = () => {
  return (
    <LayoutBasePage title="Página Inicial" listingTool={
      <DetailTool showButtonSaveAndBack />
    }>
      Teste
    </LayoutBasePage>
  );
};
