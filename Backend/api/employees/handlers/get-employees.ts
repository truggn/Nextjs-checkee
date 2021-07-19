import dbConnect from '@/utils/dbConnect';
import auth from 'Backend/middlewares/auth';

import Employee, { EmployeeDocument } from '@/models/Employee';
import type { EmployeesHandlers } from '..';


// Return all employees info
const getEmployee: EmployeesHandlers['getEmployee'] = async ({
  res,
  req,
  // body,
  // config,
}) => {
  let result: { data?: EmployeeDocument[] } = {}
  
  try {
    await dbConnect();

    // Xác thực User
    const flag = await auth(req, res);
    if (flag === 2) {
      return res.status(401).json({
        data: null,
        errors: [{message: "Token không hợp lệ"}],
      })
    }
    if (flag === 3) {
      return res.status(401).json({
        data: null,
        errors: [{message: "Không đủ quyền truy cập"}],
      }) 
    }

    // result.data = await Employee.findOne({_id: '5ff2843c02a5e04f0c7c0c97'}).sort({
    //   createdAt: "desc",
    // });

    result.data = await Employee.find({}).sort({
      createdAt: "desc",
    });

    // console.log(result.data[0].fullName)
    // console.log(result.data[0].getGender())

    // console.log(result.data)
  } catch (error) {
    return res.status(400).json({
      data: null,
      errors: [{message: error.message}],
    });
  }
  

  return res.status(200).json({ data: result.data ?? null })
}

export default getEmployee