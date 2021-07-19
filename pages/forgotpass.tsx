import { Fragment } from "react";
//import ForgotPass from "@/Forgot_Pass/Forgot_Pass"
import dynamic from 'next/dynamic'
const ForgotPass = dynamic(() => import('@/Forgot_Pass/Forgot_Pass'))
const Forgot_Pass = () => {
	return (	
        <Fragment>
            <ForgotPass/>
        </Fragment>
	);
}

export default Forgot_Pass;