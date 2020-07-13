import withSplitting from '../utils/withSplitting';

export const Home = withSplitting(() => import ('../routes/Home'));
export const About = withSplitting(() => import ('../routes/About'));
export const Posts = withSplitting(() => import ('../routes/Posts'));
export const MyPage = withSplitting(() => import ('../routes/MyPage'));
export const Login = withSplitting(() => import ('../routes/Login'));
export const Search = withSplitting(() => import ('../routes/Search'));
export const NoMatch = withSplitting(() => import ('../routes/NoMatch'));