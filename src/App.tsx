import { Routes, Route } from 'react-router-dom';
import { ContentProvider } from './lib/content-context';
import { SiteRouter } from './SiteRouter';
import { AdminLogin } from './admin/Login';
import { AdminApp } from './admin/AdminApp';
import { isShowcaseMode } from './lib/tenant';
import AgencyShowcase from './showcase/AgencyShowcase';
import { ConsentProvider } from './lib/consent';
import { CookieBanner } from './components/CookieBanner';

export default function App() {
  if (isShowcaseMode()) {
    return <AgencyShowcase />;
  }

  return (
    <ConsentProvider>
      <ContentProvider>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<AdminApp />} />
          <Route path="/*" element={<SiteRouter />} />
        </Routes>
        <CookieBanner />
      </ContentProvider>
    </ConsentProvider>
  );
}
