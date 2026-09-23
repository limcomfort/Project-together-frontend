import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ChatsPage from './pages/ChatsPage';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';
import VoiceCallPage from './pages/VoiceCallPage';
import AttachmentsPage from './pages/AttachmentsPage';
import BookmarksPage from './pages/BookmarksPage';
import AppShell from './components/AppShell';
import PhoneFrame from './components/PhoneFrame';
import PhoneHomeScreen from './components/PhoneHomeScreen';
import StubPage from './pages/StubPage';
import ReelsPage from './pages/ReelsPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PhoneFrame><PhoneHomeScreen /></PhoneFrame>} />
        <Route path="/login" element={<PhoneFrame><LoginPage /></PhoneFrame>} />
        <Route path="/stub/:name" element={<PhoneFrame><StubPage /></PhoneFrame>} />
        <Route element={<AppShell />}>
          <Route path="/chats" element={<ChatsPage />} />
          <Route path="/chat/:id" element={<ChatPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/call/:id" element={<VoiceCallPage />} />
          <Route path="/attachments/:id" element={<AttachmentsPage />} />
          <Route path="/bookmarks" element={<BookmarksPage />} />
          <Route path="/reels" element={<ReelsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
