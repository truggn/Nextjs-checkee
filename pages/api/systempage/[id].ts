import dbConnect from "@/utils/dbConnect";
import SystemPage from "@/models/SystemPage";
import SystemPageIdAPI from 'Backend/api/systempage/indexId'
export default SystemPageIdAPI()

// import type { NextApiRequest, NextApiResponse } from 'next';
// export default async (req: NextApiRequest, res: NextApiResponse) => {
// 	const {
// 		query: { id },
// 		method,
// 	} = req;

// 	await dbConnect()

// 	switch (method) {
// 		case "GET":
// 			try {
// 				const systemPage = await SystemPage.findById(id);

// 				return res.status(200).json({
// 					success: true,
// 					data: systemPage,
// 				});
// 			} catch (error) {
// 				return res.status(404).json({
// 					success: false,
// 					message: error.message,
// 				});
// 			}
// 		case "PUT":
// 			try {
// 				const systemPage = await SystemPage.findByIdAndUpdate(id, req.body, {
// 					new: true,
// 					runValidators: true,
// 				});

// 				return res.status(200).json({
// 					success: true,
// 					data: systemPage,
// 				});
// 			} catch (error) {
// 				return res.status(400).json({
// 					success: false,
// 					message: error.message,
// 				});
// 			}
// 		case "DELETE":
// 			try {
// 				await SystemPage.deleteOne({ _id: id });

// 				return res.status(200).json({
// 					success: true,
// 					data: { id },
// 				});
// 			} catch (error) {
// 				return res.status(400).json({
// 					success: false,
// 					message: error.message,
// 				});
// 			}
// 		default:
// 			return res
// 				.status(405)
// 				.json({ success: false });
// 	}
// };