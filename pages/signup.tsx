import { Fragment } from "react";
//import SignUp from "@/Sign_Up/Sign_Up"
import dynamic from 'next/dynamic'
const SignUp = dynamic(() => import('@/Sign_Up/Sign_Up'))
const Sign_Up = () => {
	return (	
        <Fragment>
            <SignUp/>
        </Fragment>
	);
}

export default Sign_Up;