import { Fragment } from "react";
//import ForgotPass from "@/Forgot_Pass/Forgot_Pass"
import dynamic from 'next/dynamic'
const ChangeForgotPass = dynamic(() => import('@/Change_Forgot_Pass/Change_Forgot_Pass'))
const Change_Forgot_Pass = () => {
	return (	
        <Fragment>
            <ChangeForgotPass/>
        </Fragment>
	);
}

export default Change_Forgot_Pass;