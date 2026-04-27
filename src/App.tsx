import { Routes, Route } from 'react-router-dom';
import { ContentProvider } from './lib/content-context';
import { SiteRouter } from './SiteRouter';
import { AdminLogin } from './admin/Login';
import { AdminApp } from './admin/AdminApp';
import { isShowcaseMode } from './lib/tenant';
import AgencyShowcase from './showcase/AgencyShowcase';

export default function App() {
  if (isShowcaseMode()) {
    return <AgencyShowcase />;
  }

  return (
    <ContentProvider>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="/*" element={<SiteRouter />} />
      </Routes>
    </ContentProvider>
  );
}
