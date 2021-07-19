//import  Login  from "@/Login/Login";
import dynamic from 'next/dynamic'
const Login = dynamic(() => import('@/Login/Login'))
import { NextPage } from 'next/types';
const HomePage: NextPage = () => {
	return (		
			<div><Login/></div>
	);
}

export default HomePage;
