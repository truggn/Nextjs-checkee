import employeesAPI from 'Backend/api/employees'

export default employeesAPI()

// import dbConnect from "@/utils/dbConnect";
// import Employee from "@/models/Employee";
// import type { NextApiRequest, NextApiResponse } from 'next';

// interface Data {
// 	success: boolean
// 	data: object
// 	message: string
// }

// export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
// 	const { method } = req;

// 	await dbConnect()

// 	switch (method) {
// 		case "GET":
// 			try {
// 				const employees  = await Employee.find({}).sort({
// 					createdAt: "desc",
//                 });

// 				return res.status(200).json({
//                     success: true,
// 					data: employees,
// 					message: 'OK',
// 				});
// 			} catch (error) {
// 				return res.status(400).json({
// 					success: false,
// 					data: {},
//                     message: error.message,
// 				});
// 			}
// 		case "POST":
// 			try {
// 				const employees = await Employee.create(req.body);
// 				return res.status(201).json({
// 					success: true,
// 					data: employees,
// 					message: 'OK',
// 				});
// 			} catch (error) {
// 				return res.status(400).json({
// 					success: false,
// 					data: {},
//                     message: error.message,
// 				});
// 			}
// 		default:
// 			return res.status(405).json({
// 				success: false,
// 				data: {},
// 				message: `Method ${method} Not Allowed`,
// 			});
// 	}
// };
