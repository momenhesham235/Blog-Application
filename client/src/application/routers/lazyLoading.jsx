import { lazy } from "react";

// layouts
const Header = lazy(() => import("@/presentations/layouts/global/Header"));
const Footer = lazy(() => import("@/presentations/layouts/global/Footer"));

// pages
const Home = lazy(() => import("@/presentations/pages/home"));
const Blog = lazy(() => import("@/presentations/pages/blog"));
const NotFound = lazy(() => import("@/presentations/pages/notFound"));

export { Header, Footer, Home, Blog, NotFound };
