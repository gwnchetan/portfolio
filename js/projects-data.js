// ============================================================
// PROJECTS DATA SOURCE
// ============================================================

const projectsData = {
    // WEB DEV PROJECTS
    'chatterbox': {
        id: 'chatterbox',
        name: 'chatterBOX',
        tag: 'Full Stack',
        logo: 'images/projects/chatterbox/logo.png',
        heroImage: 'images/projects/chatterbox/MAIN SCREEN.png',
        videoDemo: null,
        screenshots: [
            'images/projects/chatterbox/loginscreen.png',
            'images/projects/chatterbox/feed overview.png',
            'images/projects/chatterbox/message.png',
            'images/projects/chatterbox/profile.png',
            'images/projects/chatterbox/uploadpage.png',
            'images/projects/chatterbox/settingmenu.png'
        ],
        desc: 'A full-stack real-time chat application with social features, media sharing, and live communication.',
        details: 'Built with React, Vite, TanStack Query on the frontend, and Node.js with Express and Socket.io on the backend. Features Google OAuth and JWT-based authentication, real-time messaging, a follow/friend request system with privacy controls, media sharing via Cloudinary, and disappearing stories. Automatically deployed via Railway using Nixpacks.',
        role: 'Lead Full Stack Developer. Architected the entire application from the ground up, including the real-time WebSocket infrastructure, database schemas, and responsive UI components with empty state handling and client-side caching.',
        features: [
            'Real-time messaging via Socket.io',
            'Follow / Friend Request system with privacy controls',
            'Media sharing — image and video uploads via Cloudinary',
            'Stories — disappearing content like Instagram Stories',
            'Google OAuth + JWT-based authentication',
            'Responsive UI with empty state handling',
            'Client-side caching with TanStack Query'
        ],
        stack: ['React', 'Node.js', 'Express', 'Socket.io', 'MongoDB', 'JWT', 'Cloudinary'],
        github: 'https://github.com/gwnchetan/chatterBOX_v3',
        live: 'https://chatterboxv3-production.up.railway.app/',
        type: 'wd'
    },
    'outfy': {
        id: 'outfy',
        name: 'Outfyt',
        tag: 'Android App',
        logo: 'images/projects/outfy/logo.png',
        heroImage: 'images/projects/outfy/outfyt_hero.png',
        videoDemo: null,
        screenshots: [
            'images/projects/outfy/splash screen.jpeg',
            'images/projects/outfy/login.jpeg',
            'images/projects/outfy/OTPscreen.jpeg',
            'images/projects/outfy/home.jpeg',
            'images/projects/outfy/search page.jpeg',
            'images/projects/outfy/product page.jpeg',
            'images/projects/outfy/product detail.jpeg',
            'images/projects/outfy/cart.jpeg',
            'images/projects/outfy/check out screen.jpeg',
            'images/projects/outfy/order overview.jpeg',
            'images/projects/outfy/orders.jpeg',
            'images/projects/outfy/profile screen.jpeg',
            'images/projects/outfy/edit address.jpeg',
            'images/projects/outfy/admin dashboad.png',
            'images/projects/outfy/products.png',
            'images/projects/outfy/orders.png',
            'images/projects/outfy/users.png'
        ],
        desc: 'An e-commerce Android application for premium apparel, built with Kotlin following clean MVVM architecture with a React admin panel.',
        details: 'Features Firebase authentication (Phone OTP + Google Sign-In), Firestore database, and a React-based admin panel. Built with Kotlin and MVVM architecture. Implements phone number login with OTP verification, rate limiting, and unique email/phone enforcement. Includes a separate React web app for the admin panel to manage users, products, and orders.',
        role: 'Android & Frontend Developer. Built the Kotlin Android app using MVVM and the React admin panel, integrated with Firebase Auth and Firestore.',
        features: [
            'Phone number login with OTP verification & Google Sign-In',
            'Age validation on registration (13+ only)',
            'Secure back stack management',
            'MVVM architecture throughout',
            'Firebase Firestore as backend database',
            'React admin panel for dashboard, users, and products management'
        ],
        stack: ['Kotlin', 'Android', 'MVVM', 'Firebase Auth', 'Firestore', 'React'],
        github: 'https://github.com/gwnchetan/outfy',
        live: null,
        type: 'wd'
    }
};

// Also define order for grids
const wdProjectsOrder = ['chatterbox', 'outfy'];
const cyProjectsOrder = [];
