import { useState } from 'react';
import { Home } from './components/Home';
import { CourseDetails } from './components/CourseDetails';
import { VideoLesson } from './components/VideoLesson';
import { Quiz } from './components/Quiz';
import { Progress } from './components/Progress';
import { BottomNavigation } from './components/BottomNavigation';

type Screen = 'home' | 'course-details' | 'video-lesson' | 'quiz' | 'progress' | 'profile';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const [selectedLessonId, setSelectedLessonId] = useState<string>('');
  const [lessonType, setLessonType] = useState<string>('video');

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourseId(courseId);
    setCurrentScreen('course-details');
  };

  const handleLessonSelect = (lessonId: string, type: string) => {
    setSelectedLessonId(lessonId);
    setLessonType(type);
    if (type === 'quiz') {
      setCurrentScreen('quiz');
    } else {
      setCurrentScreen('video-lesson');
    }
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
    setSelectedCourseId('');
    setSelectedLessonId('');
  };

  const handleBackToCourse = () => {
    setCurrentScreen('course-details');
    setSelectedLessonId('');
  };

  const handleTabChange = (tab: string) => {
    switch (tab) {
      case 'home':
        setCurrentScreen('home');
        break;
      case 'courses':
        setCurrentScreen('home');
        break;
      case 'achievements':
        setCurrentScreen('progress');
        break;
      case 'profile':
        setCurrentScreen('profile');
        break;
      default:
        setCurrentScreen('home');
    }
  };

  const handleLessonComplete = () => {
    // Mark lesson as complete and go back to course
    setCurrentScreen('course-details');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <Home onCourseSelect={handleCourseSelect} />;
      
      case 'course-details':
        return (
          <CourseDetails
            courseId={selectedCourseId}
            onBack={handleBackToHome}
            onLessonSelect={handleLessonSelect}
          />
        );
      
      case 'video-lesson':
        return (
          <VideoLesson
            lessonId={selectedLessonId}
            onBack={handleBackToCourse}
            onComplete={handleLessonComplete}
          />
        );
      
      case 'quiz':
        return (
          <Quiz
            quizId={selectedLessonId}
            onBack={handleBackToCourse}
            onComplete={handleLessonComplete}
          />
        );
      
      case 'progress':
        return <Progress />;
      
      case 'profile':
        return (
          <div className="flex-1 pb-20 p-4">
            <h1 className="text-xl font-medium mb-4">Profile</h1>
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="text-2xl text-primary-foreground">U</span>
                </div>
                <h2 className="font-medium">User Name</h2>
                <p className="text-sm text-muted-foreground">Learning enthusiast</p>
              </div>
              
              <div className="space-y-2">
                <div className="p-3 border rounded-lg">
                  <h3 className="font-medium">Account Settings</h3>
                  <p className="text-sm text-muted-foreground">Manage your account preferences</p>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <h3 className="font-medium">Learning Preferences</h3>
                  <p className="text-sm text-muted-foreground">Customize your learning experience</p>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <h3 className="font-medium">Notifications</h3>
                  <p className="text-sm text-muted-foreground">Manage your notifications</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return <Home onCourseSelect={handleCourseSelect} />;
    }
  };

  // Don't show bottom navigation on video lesson or quiz screens
  const showBottomNav = !['video-lesson', 'quiz'].includes(currentScreen);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {renderScreen()}
      
      {showBottomNav && (
        <BottomNavigation
          activeTab={currentScreen === 'progress' ? 'achievements' : currentScreen}
          onTabChange={handleTabChange}
        />
      )}
    </div>
  );
}