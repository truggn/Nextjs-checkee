import dbConnect from '@/utils/dbConnect';
import Employee, { EmployeeDocument, IEmployee } from '@/models/Employee';
import type { EmployeesHandlers } from '..';

// Return all employees info
const addEmployee: EmployeesHandlers['addEmployee'] = async ({
    res,
    body /* : {firstName, lastName, email, password}  */,
    // config,
  }) => {
    let result: { data?: EmployeeDocument } = {}
    let a: EmployeeDocument
    try {
      await dbConnect()
  
      // result.data = await Employee.findOne({_id: '5ff2843c02a5e04f0c7c0c97'}).sort({
      //   createdAt: "desc",
      // });
      //console.log(body)

      const _employee: IEmployee = {
        firstName: "CNG",
        lastName: "DX",
        dateOfBirth: "111",
        gender: 1,
        email: "cngdx@gmail.com",
        address: "hcm01",
        phone: "321321321",
        image_url: 'image.jpg',
        likes: [],
        dislikes: [],
      };

      // result.data = await Employee.findOne({_id: "5ffeaa27e62f651facf9be42"})
      result.data = await Employee.create(_employee)
  
      // console.log(result.data[0].fullName)
      // console.log(result.data[0].getGender())
  
      console.log(result.data)
    } catch (error) {
      return res.status(400).json({
        data: null,
        errors: [{message: error.message}],
      });
    }
    
  
    return res.status(200).json({ data: /* result.data ?? */ null })
  }
  
  export default addEmployee