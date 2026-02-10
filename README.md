# StyleLoom

A modern, feature-rich e-commerce platform for fashion retail, built with React, TypeScript, and Firebase. StyleLoom combines elegant design with powerful admin capabilities to deliver a premium shopping experience.

![Version](https://img.shields.io/badge/version-0.0.0-blue.svg)
![React](https://img.shields.io/badge/React-19.2.3-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178c6.svg)
![Firebase](https://img.shields.io/badge/Firebase-12.8.0-ffca28.svg)

## ✨ Features

### Customer Experience
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices
- **Dark Mode**: Seamless theme switching with persistent user preferences
- **Smooth Animations**: Powered by Framer Motion and Lenis for buttery-smooth scrolling
- **Product Filtering**: Advanced filtering by category, type, and price
- **Grid & List Views**: Flexible product display options
- **Shopping Cart**: Full cart management with real-time updates
- **Product Details**: Rich product pages with image galleries and detailed specifications

### Admin Dashboard
- **Real-time Product Management**: CRUD operations synced with Firebase Realtime Database
- **Bulk Operations**: Select and manage multiple products simultaneously
- **Live Editing**: Edit product details directly from the sidebar
- **CSV Export**: Export selected products for external analysis
- **Keyboard Shortcuts**: Efficient navigation with custom hotkeys
- **Visual Feedback**: Hover states and delete previews for better UX
- **Floating Utility Bar**: Quick access to admin tools on product pages
- **View Mode Toggle**: Switch between grid and list layouts instantly

### Technical Highlights
- **State Management**: Redux Toolkit with async thunks for complex state logic
- **Real-time Sync**: Firebase Realtime Database with optimistic updates
- **Local Backup**: Automatic localStorage fallback for offline resilience
- **Type Safety**: Full TypeScript coverage for robust development
- **Custom Hooks**: Reusable logic for keyboard shortcuts, scroll behavior, and more
- **Modular Architecture**: Component-based structure for maintainability

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first styling
- **Redux Toolkit** - State management
- **React Router 7** - Client-side routing
- **Framer Motion** - Animations
- **Lenis** - Smooth scrolling
- **Recharts** - Data visualization

### Backend & Services
- **Firebase Realtime Database** - Real-time data sync
- **Firebase Authentication** - User management
- **Firebase Storage** - Image hosting

### UI/UX
- **Roboto & Roboto Mono** - Typography
- **React Icons** - Icon library
- **Lucide React** - Additional icons
- **Custom Design System** - Consistent theming

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/wadahdahi/style-loom-website.git

# Navigate to project directory
cd style-loom

# Install dependencies
npm install

# Set up Firebase
# Create a .env file with your Firebase credentials
# VITE_FIREBASE_API_KEY=your_api_key
# VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
# VITE_FIREBASE_DATABASE_URL=your_database_url
# VITE_FIREBASE_PROJECT_ID=your_project_id
# VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
# VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
# VITE_FIREBASE_APP_ID=your_app_id

# Start development server
npm run dev
```

## 🚀 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run firebase:upload  # Upload initial data to Firebase
```

## 🎨 Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── common/      # Shared components (buttons, cards, etc.)
│   ├── dashboard/   # Admin dashboard components
│   └── non-common/  # Page-specific components
├── constants/       # App constants and icon registry
├── context/         # React context providers
├── data/           # Static data and mock content
├── firebase/       # Firebase configuration and services
├── hooks/          # Custom React hooks
├── layouts/        # Layout components (Header, Footer, etc.)
├── pages/          # Route pages
├── redux/          # Redux store, slices, and reducers
├── thunks/         # Redux async thunks
├── type/           # TypeScript type definitions
└── utils/          # Utility functions
```

## 🔑 Key Features Breakdown

### Dashboard Capabilities
- **Product CRUD**: Create, read, update, and delete products with Firebase sync
- **Batch Selection**: Select all products on current page or visible items
- **Quick Delete**: Delete multiple products with confirmation prompts
- **Live Preview**: See changes in real-time before saving
- **Sidebar Editor**: Edit product details without leaving the products page
- **Responsive Admin UI**: Fully functional on mobile devices

### User Interface
- **Mobile Navigation**: Slide-out menu with smooth animations
- **Theme Persistence**: Dark/light mode saved to localStorage
- **Lazy Loading**: Optimized image loading for performance
- **Pagination**: Efficient product browsing with react-paginate
- **Accessibility**: ARIA labels and keyboard navigation support

### Performance Optimizations
- **Code Splitting**: Dynamic imports for faster initial load
- **Memoization**: React.memo and useMemo for expensive computations
- **Debouncing**: Optimized search and filter operations
- **Local Caching**: Reduced Firebase reads with localStorage backup

## 🎯 Admin Dashboard Features

### Navigation
- **Keyboard Shortcuts**: Navigate pages with single-key commands
- **Breadcrumb Trail**: Always know your current location
- **Quick Links**: Jump to any section instantly

### Product Management
- **Inline Editing**: Modify products without opening modals
- **Image Upload**: Support for main image and 3 gallery images
- **Category Management**: Organize products by type and category
- **Stock Status**: Track product availability

### Analytics (Overview Page)
- **Product Statistics**: Total products, categories, and types
- **Visual Charts**: Data visualization with Recharts
- **Recent Activity**: Track latest changes

## 🌐 Deployment

Built and optimized for deployment on Vercel:

```bash
npm run build
# Deploy the dist/ folder to your hosting provider
```

## 📝 License

This project is public

## 👨‍💻 Authors

**FOCAL X ACADEMY - FRONTEND ADV. TEAM X3**
- GitHub: [@wadahdahi](https://github.com/wadahdahi)
- GitHub: [@NourAlhoussein](https://github.com/NourAlhoussein)
- GitHub: [@heba-momar](https://github.com/heba-momar)
- GitHub: [@Rabee-Gh](https://github.com/Rabee-Gh)
- GitHub: [@Faten01alsafadi](https://github.com/Faten01alsafadi)
- GitHub: [@moamen-mohamad](https://github.com/moamen-mohamad)
- GitHub: [@ibrahem](https://github.com/00000000000000ibrahem)
---

Built with ❤️ using React, TypeScript, and Firebase
