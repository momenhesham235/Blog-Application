import { lazy } from "react";

// layouts
const Header = lazy(() => import("@/presentations/layouts/global/Header"));
const Footer = lazy(() => import("@/presentations/layouts/global/Footer"));

// pages
const Home = lazy(() => import("@/presentations/pages/home"));
const Blog = lazy(() => import("@/presentations/pages/blog"));
const NotFound = lazy(() => import("@/presentations/pages/notFound"));
const Login = lazy(() => import("@/presentations/pages/login"));
const Register = lazy(() => import("@/presentations/pages/register"));

export { Header, Footer, Home, Login, Register, Blog, NotFound };
